import { copyFile, access, constants, cp, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { logger } from "./logger.js";
import { logClaudeMdCopy, logError } from "./file-logger.js";

/**
 * Get the repository root path dynamically
 * Assumes backend is running from any1can-code/claude-code-webui/backend
 * and repository root is at any1can-code/ (2 levels up)
 */
function getRepositoryRoot(): string {
  const backendDir = cwd();
  const repoRoot = resolve(backendDir, "../..");

  logger.app.debug(`Backend running from: ${backendDir}`);
  logger.app.debug(`Repository root at: ${repoRoot}`);

  logClaudeMdCopy(`Backend running from: ${backendDir}`, "DEBUG");
  logClaudeMdCopy(`Repository root at: ${repoRoot}`, "DEBUG");

  return repoRoot;
}

/**
 * Get the source CLAUDE.md location dynamically
 */
function getSourceClaudeMdPath(): string {
  const repoRoot = getRepositoryRoot();
  const claudeMdPath = join(repoRoot, "CLAUDE.md");

  logger.app.debug(`Looking for CLAUDE.md at: ${claudeMdPath}`);
  logClaudeMdCopy(`Looking for CLAUDE.md at: ${claudeMdPath}`, "DEBUG");

  return claudeMdPath;
}

/**
 * Copy examples directory to target working directory
 */
async function copyExamplesDirectory(targetDirectory: string): Promise<boolean> {
  try {
    const repoRoot = getRepositoryRoot();
    const sourceExamplesDir = join(repoRoot, "examples");
    const targetExamplesDir = join(targetDirectory, "examples");

    logger.app.info(`Copying examples directory from ${sourceExamplesDir} to ${targetExamplesDir}`);
    await logClaudeMdCopy(`Copying examples directory from ${sourceExamplesDir} to ${targetExamplesDir}`, "INFO");

    // Check if source examples directory exists
    try {
      await access(sourceExamplesDir, constants.R_OK);
    } catch (error) {
      const msg = `Source examples directory not found at ${sourceExamplesDir}`;
      logger.app.error(msg);
      await logError(msg, error);
      return false;
    }

    // Check if target examples directory already exists
    try {
      await access(targetExamplesDir, constants.F_OK);
      const msg = `Examples directory already exists at ${targetExamplesDir}, skipping copy`;
      logger.app.info(msg);
      await logClaudeMdCopy(msg, "INFO");
      return true;
    } catch {
      // Directory doesn't exist, proceed with copy
      const msg = `Examples directory does not exist at ${targetExamplesDir}, will copy`;
      logger.app.debug(msg);
      await logClaudeMdCopy(msg, "DEBUG");
    }

    // Copy entire examples directory recursively
    await cp(sourceExamplesDir, targetExamplesDir, { recursive: true });

    const successMsg = `✅ Successfully copied examples directory to ${targetExamplesDir}`;
    logger.app.info(successMsg);
    await logClaudeMdCopy(successMsg, "INFO");
    return true;
  } catch (error) {
    const errorMsg = `Failed to copy examples directory to ${targetDirectory}`;
    logger.app.error(`${errorMsg}: {error}`, { error });
    await logError(errorMsg, error);
    return false;
  }
}

/**
 * Copies CLAUDE.md and examples directory to the target working directory
 * @param targetDirectory - The working directory where CLAUDE.md should be copied
 * @returns true if copy was successful or file already exists, false otherwise
 */
export async function ensureClaudeMdInDirectory(
  targetDirectory: string,
): Promise<boolean> {
  try {
    const targetPath = join(targetDirectory, "CLAUDE.md");
    const sourcePath = getSourceClaudeMdPath();

    logger.app.info(
      `Attempting to copy CLAUDE.md from ${sourcePath} to ${targetPath}`,
    );
    await logClaudeMdCopy(
      `Attempting to copy CLAUDE.md from ${sourcePath} to ${targetPath}`,
      "INFO"
    );

    // Check if source and target are the same (user selected repo root)
    if (resolve(sourcePath) === resolve(targetPath)) {
      const msg = `Source and target are the same (${sourcePath}), CLAUDE.md already in place`;
      logger.app.info(msg);
      await logClaudeMdCopy(msg, "INFO");
      return true;
    }

    // Check if CLAUDE.md already exists in target directory
    try {
      await access(targetPath, constants.F_OK);
      const msg = `CLAUDE.md already exists at ${targetPath}, skipping copy`;
      logger.app.info(msg);
      await logClaudeMdCopy(msg, "INFO");
      return true;
    } catch {
      // File doesn't exist, proceed with copy
      const msg = `CLAUDE.md does not exist at ${targetPath}, will copy from ${sourcePath}`;
      logger.app.debug(msg);
      await logClaudeMdCopy(msg, "DEBUG");
    }

    // Check if source CLAUDE.md exists
    try {
      await access(sourcePath, constants.R_OK);
      const msg = `Source CLAUDE.md found at ${sourcePath}`;
      logger.app.debug(msg);
      await logClaudeMdCopy(msg, "DEBUG");
    } catch (error) {
      const msg = `Source CLAUDE.md not found at ${sourcePath}`;
      logger.app.error(msg);
      logger.app.error(`Error details: {error}`, { error });
      await logError(msg, error);
      return false;
    }

    // Copy CLAUDE.md to target directory
    await copyFile(sourcePath, targetPath);
    const successMsg = `✅ Successfully copied CLAUDE.md to ${targetPath}`;
    logger.app.info(successMsg);
    await logClaudeMdCopy(successMsg, "INFO");

    // Also copy examples directory to target directory
    const examplesCopySuccess = await copyExamplesDirectory(targetDirectory);
    if (!examplesCopySuccess) {
      logger.app.warn("Failed to copy examples directory, but CLAUDE.md was copied successfully");
      await logClaudeMdCopy("Failed to copy examples directory, but CLAUDE.md was copied successfully", "INFO");
    }

    return true;
  } catch (error) {
    const errorMsg = `Failed to copy CLAUDE.md to ${targetDirectory}`;
    logger.app.error(`${errorMsg}: {error}`, { error });
    await logError(errorMsg, error);
    return false;
  }
}
