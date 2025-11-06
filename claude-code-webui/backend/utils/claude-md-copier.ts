import { copyFile, access, constants } from "node:fs/promises";
import { join } from "node:path";
import { logger } from "./logger.js";

/**
 * Source CLAUDE.md location (main repository file)
 */
const SOURCE_CLAUDE_MD = "/home/kpanse/wsl-myprojects/any1can-code/CLAUDE.md";

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

    // Check if CLAUDE.md already exists in target directory
    try {
      await access(targetPath, constants.F_OK);
      logger.app.debug(
        `CLAUDE.md already exists in ${targetDirectory}, skipping copy`,
      );
      return true;
    } catch {
      // File doesn't exist, proceed with copy
    }

    // Check if source CLAUDE.md exists
    try {
      await access(SOURCE_CLAUDE_MD, constants.R_OK);
    } catch {
      logger.app.error(
        `Source CLAUDE.md not found at ${SOURCE_CLAUDE_MD}`,
      );
      return false;
    }

    // Copy CLAUDE.md to target directory
    await copyFile(SOURCE_CLAUDE_MD, targetPath);
    logger.app.info(
      `✅ Copied CLAUDE.md to ${targetDirectory}`,
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
