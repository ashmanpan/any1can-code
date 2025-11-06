import type { Context } from "hono";
import { logger } from "../utils/logger.js";
import { getRuntime } from "../runtime/index.js";

const runtime = getRuntime();

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
  maxDepth: number = 3,
  currentDepth: number = 0,
): Promise<DirectoryNode[]> {
  if (currentDepth >= maxDepth) {
    return [];
  }

  try {
    const entries = await runtime.readDir(dirPath);
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
    ]);

    for (const entry of entries) {
      const entryPath = runtime.joinPath(dirPath, entry.name);
      const isDirectory = entry.isDirectory;

      // Skip ignored directories
      if (isDirectory && ignoredDirs.has(entry.name)) {
        continue;
      }

      // Skip hidden files/directories (starting with .)
      if (entry.name.startsWith(".") && entry.name !== ".claude") {
        continue;
      }

      const node: DirectoryNode = {
        name: entry.name,
        path: entryPath,
        type: isDirectory ? "directory" : "file",
      };

      // Recursively read subdirectories
      if (isDirectory) {
        node.children = await readDirectoryTree(
          entryPath,
          maxDepth,
          currentDepth + 1,
        );
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
    const workingDir = c.req.query("path") || runtime.cwd();

    logger.info(`Getting directory tree for: ${workingDir}`);

    const tree = await readDirectoryTree(workingDir, 3); // Max depth of 3

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
