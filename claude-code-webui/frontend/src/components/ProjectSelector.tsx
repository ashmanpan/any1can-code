import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FolderIcon } from "@heroicons/react/24/outline";
import type { ProjectsResponse, ProjectInfo } from "../types";
import { getProjectsUrl } from "../config/api";
import { SettingsButton } from "./SettingsButton";
import { SettingsModal } from "./SettingsModal";

export function ProjectSelector() {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(getProjectsUrl());
      if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.statusText}`);
      }
      const data: ProjectsResponse = await response.json();
      setProjects(data.projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (projectPath: string) => {
    const normalizedPath = projectPath.startsWith("/")
      ? projectPath
      : `/${projectPath}`;
    navigate(`/projects${normalizedPath}`);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-600 dark:text-slate-400">
          Loading projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with Cisco Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Cisco Logo SVG */}
              <svg className="h-10 w-auto" viewBox="0 0 100 50" fill="currentColor">
                <g className="text-blue-600 dark:text-blue-400">
                  <rect x="10" y="15" width="4" height="20" rx="2"/>
                  <rect x="20" y="10" width="4" height="30" rx="2"/>
                  <rect x="30" y="5" width="4" height="40" rx="2"/>
                  <rect x="40" y="10" width="4" height="30" rx="2"/>
                  <rect x="50" y="15" width="4" height="20" rx="2"/>
                  <rect x="60" y="10" width="4" height="30" rx="2"/>
                  <rect x="70" y="5" width="4" height="40" rx="2"/>
                  <rect x="80" y="10" width="4" height="30" rx="2"/>
                  <rect x="90" y="15" width="4" height="20" rx="2"/>
                </g>
              </svg>
              <div>
                <h1 className="text-slate-800 dark:text-slate-100 text-3xl font-bold tracking-tight">
                  Cisco Any1can Code Platform
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  AI-Powered Code Generation for Everyone
                </p>
              </div>
            </div>
            <SettingsButton onClick={handleSettingsClick} />
          </div>
          <h2 className="text-slate-700 dark:text-slate-300 text-xl font-semibold">
            Select a Project Directory
          </h2>
        </div>

        <div className="space-y-3">
          {projects.length > 0 && (
            <>
              <h2 className="text-slate-700 dark:text-slate-300 text-lg font-medium mb-4">
                Recent Projects
              </h2>
              {projects.map((project) => (
                <button
                  key={project.path}
                  onClick={() => handleProjectSelect(project.path)}
                  className="w-full flex items-center gap-3 p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors text-left"
                >
                  <FolderIcon className="h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 font-mono text-sm">
                    {project.path}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Settings Modal */}
        <SettingsModal isOpen={isSettingsOpen} onClose={handleSettingsClose} />
      </div>
    </div>
  );
}
