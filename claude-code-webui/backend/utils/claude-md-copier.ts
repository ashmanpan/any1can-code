import { copyFile, access, constants } from "node:fs/promises";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { logger } from "./logger.js";
import { logClaudeMdCopy, logError } from "./file-logger.js";

/**
 * Get the source CLAUDE.md location dynamically
 * Assumes backend is running from any1can-code/claude-code-webui/backend
 * and CLAUDE.md is at any1can-code/CLAUDE.md (2 levels up)
 */
function getSourceClaudeMdPath(): string {
  // Try to find CLAUDE.md in repository root
  // Backend runs from: any1can-code/claude-code-webui/backend
  // Repository root: any1can-code/
  const backendDir = cwd();

  // Try going up 2 levels to repository root
  const repoRoot = resolve(backendDir, "../..");
  const claudeMdPath = join(repoRoot, "CLAUDE.md");

  logger.app.debug(`Backend running from: ${backendDir}`);
  logger.app.debug(`Looking for CLAUDE.md at: ${claudeMdPath}`);

  // Log to file
  logClaudeMdCopy(`Backend running from: ${backendDir}`, "DEBUG");
  logClaudeMdCopy(`Looking for CLAUDE.md at: ${claudeMdPath}`, "DEBUG");

  return claudeMdPath;
}

/**
 * Copies CLAUDE.md to the target working directory if it doesn't already exist
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
    return true;
  } catch (error) {
    const errorMsg = `Failed to copy CLAUDE.md to ${targetDirectory}`;
    logger.app.error(`${errorMsg}: {error}`, { error });
    await logError(errorMsg, error);
    return false;
  }
}
