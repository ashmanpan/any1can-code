import { copyFile, access, constants } from "node:fs/promises";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { logger } from "./logger.js";

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

    // Check if CLAUDE.md already exists in target directory
    try {
      await access(targetPath, constants.F_OK);
      logger.app.info(
        `CLAUDE.md already exists in ${targetDirectory}, skipping copy`,
      );
      return true;
    } catch {
      // File doesn't exist, proceed with copy
      logger.app.debug(`CLAUDE.md does not exist in ${targetDirectory}, will copy`);
    }

    // Check if source CLAUDE.md exists
    try {
      await access(sourcePath, constants.R_OK);
      logger.app.debug(`Source CLAUDE.md found at ${sourcePath}`);
    } catch (error) {
      logger.app.error(
        `Source CLAUDE.md not found at ${sourcePath}`,
      );
      logger.app.error(
        `Error details: {error}`,
        { error },
      );
      return false;
    }

    // Copy CLAUDE.md to target directory
    await copyFile(sourcePath, targetPath);
    logger.app.info(
      `✅ Successfully copied CLAUDE.md to ${targetPath}`,
    );
    return true;
  } catch (error) {
    logger.app.error(
      `Failed to copy CLAUDE.md to ${targetDirectory}: {error}`,
      { error },
    );
    return false;
  }
}
