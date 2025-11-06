import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

/**
 * Log directory - creates logs in backend directory
 */
const LOG_DIR = join(cwd(), "logs");
const CLAUDE_MD_COPY_LOG = join(LOG_DIR, "claude-md-copy.log");
const ERROR_LOG = join(LOG_DIR, "errors.log");

/**
 * Initialize log directory
 */
async function ensureLogDirectory(): Promise<void> {
  try {
    await mkdir(LOG_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to create log directory:", error);
  }
}

/**
 * Format log message with timestamp
 */
function formatLogMessage(level: string, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}\n`;
}

/**
 * Write CLAUDE.md copy operation logs
 */
export async function logClaudeMdCopy(message: string, level: "INFO" | "ERROR" | "DEBUG" = "INFO"): Promise<void> {
  try {
    await ensureLogDirectory();
    const logMessage = formatLogMessage(level, message);
    await appendFile(CLAUDE_MD_COPY_LOG, logMessage);
    console.log(logMessage.trim()); // Also log to console
  } catch (error) {
    console.error("Failed to write to CLAUDE.md copy log:", error);
  }
}

/**
 * Write error logs
 */
export async function logError(message: string, error?: unknown): Promise<void> {
  try {
    await ensureLogDirectory();
    let logMessage = formatLogMessage("ERROR", message);

    if (error) {
      if (error instanceof Error) {
        logMessage += `  Error: ${error.message}\n`;
        logMessage += `  Stack: ${error.stack}\n`;
      } else {
        logMessage += `  Error: ${JSON.stringify(error)}\n`;
      }
    }

    await appendFile(ERROR_LOG, logMessage);
    console.error(logMessage.trim()); // Also log to console
  } catch (err) {
    console.error("Failed to write to error log:", err);
  }
}

/**
 * Get log file paths for sharing
 */
export function getLogFilePaths(): { claudeMdCopyLog: string; errorLog: string } {
  return {
    claudeMdCopyLog: CLAUDE_MD_COPY_LOG,
    errorLog: ERROR_LOG,
  };
}
