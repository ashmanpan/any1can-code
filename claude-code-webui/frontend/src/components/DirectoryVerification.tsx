import { useEffect, useState } from "react";
import { FolderIcon, DocumentIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface DirectoryNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: DirectoryNode[];
}

interface DirectoryVerificationProps {
  workingDirectory?: string;
  onContinue: () => void;
}

export function DirectoryVerification({ workingDirectory, onContinue }: DirectoryVerificationProps) {
  const [tree, setTree] = useState<DirectoryNode[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [isCorrectDirectory, setIsCorrectDirectory] = useState<boolean | null>(null);
  const [missingItems, setMissingItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDirectoryTree();
  }, [workingDirectory]);

  const fetchDirectoryTree = async () => {
    try {
      setLoading(true);
      setError(null);

      const path = workingDirectory || "";
      const url = `/api/directory-tree${path ? `?path=${encodeURIComponent(path)}` : ''}`;
      console.log("Fetching directory tree from:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, response.statusText, errorText);
        setError(`API Error: ${response.status} ${response.statusText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Directory tree data:", data);

      setTree(data.tree || []);
      setCurrentPath(data.path || "");

      // Verify required files/directories
      verifyDirectory(data.tree || []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching directory tree:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setLoading(false);
    }
  };

  const verifyDirectory = (nodes: DirectoryNode[]) => {
    const requiredItems = {
      "CLAUDE.md": false,
      "examples": false,
      "tools": false,
      "claude-code-webui": false,
    };

    const missing: string[] = [];

    // Check for required items
    nodes.forEach((node) => {
      if (node.name in requiredItems) {
        requiredItems[node.name as keyof typeof requiredItems] = true;
      }
    });

    // Collect missing items
    Object.entries(requiredItems).forEach(([name, found]) => {
      if (!found) {
        missing.push(name);
      }
    });

    setMissingItems(missing);
    setIsCorrectDirectory(missing.length === 0);
  };

  const renderTree = (nodes: DirectoryNode[], level: number = 0) => {
    return (
      <ul className={`${level > 0 ? "ml-4 border-l border-gray-700" : ""}`}>
        {nodes.map((node, index) => (
          <li key={index} className="py-1">
            <div className="flex items-center gap-2 hover:bg-gray-800 px-2 py-1 rounded">
              {node.type === "directory" ? (
                <FolderIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
              ) : (
                <DocumentIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              <span className={`text-sm ${node.type === "directory" ? "text-white font-medium" : "text-gray-300"}`}>
                {node.name}
              </span>
              {/* Highlight important files */}
              {(node.name === "CLAUDE.md" || node.name === "examples" || node.name === "tools") && (
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
              )}
            </div>
            {node.children && node.children.length > 0 && renderTree(node.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">🚀 Any1Can Code Platform</h1>
          <p className="text-gray-100">Directory Verification</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-white text-lg">Loading directory structure...</p>
              <p className="text-gray-400 text-sm mt-2">This should only take a moment</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-red-300 mb-2">⚠️ Error Loading Directory</h3>
              <p className="text-sm text-red-200">{error}</p>
              <p className="text-sm text-red-200 mt-2">
                Make sure the backend is running on port 8080.
                <br />
                Check the console (F12) for more details.
              </p>
            </div>
          )}

          {/* Current Directory */}
          {!loading && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-2">Current Working Directory:</h2>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 break-all">
                  {currentPath || "Not loaded"}
                </div>
              </div>

          {/* Verification Status */}
          <div className="mb-6">
            {isCorrectDirectory === null ? (
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex items-start gap-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-300 mb-1">Checking directory...</h3>
                  <p className="text-sm text-blue-200">Please wait while we verify your setup.</p>
                </div>
              </div>
            ) : isCorrectDirectory ? (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-300 mb-1">✅ Correct Directory!</h3>
                  <p className="text-sm text-green-200">All required files and directories found. You're ready to start!</p>
                  <ul className="mt-2 space-y-1 text-sm text-green-200">
                    <li>✓ CLAUDE.md (main instructions)</li>
                    <li>✓ examples/ (34+ workflows)</li>
                    <li>✓ tools/ (CWM validator)</li>
                    <li>✓ claude-code-webui/ (application)</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex items-start gap-3">
                <XCircleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-300 mb-1">❌ Wrong Directory!</h3>
                  <p className="text-sm text-red-200 mb-2">You're not in the any1can-code directory. Missing:</p>
                  <ul className="space-y-1 text-sm text-red-200 ml-4">
                    {missingItems.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <div className="mt-4 bg-red-950/50 rounded p-3 text-sm text-red-100">
                    <p className="font-semibold mb-2">How to fix:</p>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Navigate to the any1can-code directory</li>
                      <li>Run: <code className="bg-gray-900 px-2 py-0.5 rounded">cd any1can-code</code></li>
                      <li>Then start the application from there</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Directory Tree */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Directory Structure:</h2>
            <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
              {tree.length > 0 ? (
                renderTree(tree)
              ) : (
                <p className="text-gray-400 text-sm">Loading directory structure...</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={fetchDirectoryTree}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              🔄 Refresh
            </button>

            {isCorrectDirectory && (
              <button
                onClick={onContinue}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                ✅ Continue to Application →
              </button>
            )}

            {isCorrectDirectory === false && (
              <div className="flex-1 px-6 py-3 bg-gray-700 text-gray-400 rounded-lg font-medium text-center cursor-not-allowed">
                ⚠️ Please navigate to correct directory first
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-sm text-gray-400">
            <p>
              <strong>Need help?</strong> See{" "}
              <a
                href="https://github.com/ashmanpan/any1can-code/blob/main/GETTING-STARTED.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                GETTING-STARTED.md
              </a>
              {" "}for detailed setup instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
