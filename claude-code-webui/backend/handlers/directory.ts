import type { Context } from "hono";
import { logger } from "../utils/logger.js";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

interface DirectoryNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: DirectoryNode[];
}

/**
 * Read directory structure recursively
 */
async function readDirectoryTree(
  dirPath: string,
  maxDepth: number = 2,
  currentDepth: number = 0,
): Promise<DirectoryNode[]> {
  if (currentDepth >= maxDepth) {
    return [];
  }

  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const nodes: DirectoryNode[] = [];

    // Filter out common ignored directories
    const ignoredDirs = new Set([
      "node_modules",
      ".git",
      ".next",
      "dist",
      "build",
      ".cache",
      "coverage",
      ".vscode",
      ".idea",
      "__pycache__",
      ".DS_Store",
    ]);

    for (const entry of entries) {
      const entryName = entry.name;

      // Skip ignored directories
      if (entry.isDirectory() && ignoredDirs.has(entryName)) {
        continue;
      }

      // Skip hidden files/directories (starting with .) except .claude
      if (entryName.startsWith(".") && entryName !== ".claude") {
        continue;
      }

      const entryPath = join(dirPath, entryName);
      const isDirectory = entry.isDirectory();

      const node: DirectoryNode = {
        name: entryName,
        path: entryPath,
        type: isDirectory ? "directory" : "file",
      };

      // Recursively read subdirectories (but limit depth)
      if (isDirectory && currentDepth < maxDepth - 1) {
        try {
          node.children = await readDirectoryTree(
            entryPath,
            maxDepth,
            currentDepth + 1,
          );
        } catch (err) {
          // Skip directories we can't read
          logger.debug(`Cannot read directory ${entryPath}:`, err);
          node.children = [];
        }
      }

      nodes.push(node);
    }

    // Sort: directories first, then files, alphabetically within each group
    nodes.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "directory" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    return nodes;
  } catch (error) {
    logger.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

/**
 * Handler for GET /api/directory-tree
 * Returns the directory structure of the current working directory
 */
export async function getDirectoryTree(c: Context) {
  try {
    // Get working directory from query parameter or use current working directory
    const workingDir = c.req.query("path") || cwd();

    logger.info(`Getting directory tree for: ${workingDir}`);

    const tree = await readDirectoryTree(workingDir, 2); // Max depth of 2

    return c.json({
      path: workingDir,
      tree,
    });
  } catch (error) {
    logger.error("Error getting directory tree:", error);
    return c.json(
      {
        error: "Failed to read directory tree",
        details: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  }
}
