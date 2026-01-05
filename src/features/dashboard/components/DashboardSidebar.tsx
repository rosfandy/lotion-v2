"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineDocumentText,
  HiOutlineChevronRight,
  HiOutlineFolder,
  HiOutlinePlus,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import { useWorkSpace } from "@/features/workspace/hook/useWorkspace";
import Link from "next/link";
import { useDocument } from "@/features/document/hook/useDocument";

interface DashboardSidebarProps {
  onNewPageClick?: () => void;
}

export const DashboardSidebar = ({ onNewPageClick }: DashboardSidebarProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [openWorkspaces, setOpenWorkspaces] = useState<Set<string>>(new Set());
  const params = useParams();
  const workspaceId = params?.workspaceId as string;
  
  const { getWorkSpaces } = useWorkSpace();
  const workSpaces = getWorkSpaces();
  
  const {
    workspaceData,
    isLoading,
    getFavorites,
  } = useDocument();

  // Auto-open workspace when navigating to workspace page
  useEffect(() => {
    if (workspaceId) {
      setOpenWorkspaces(prev => {
        const newSet = new Set(prev);
        newSet.add(workspaceId);
        return newSet;
      });
    } else {
      // Close all workspaces when navigating away
      setOpenWorkspaces(new Set());
    }
  }, [workspaceId]);

  const toggleWorkspace = (workspaceId: string) => {
    setOpenWorkspaces(prev => {
      const newSet = new Set(prev);
      if (newSet.has(workspaceId)) {
        newSet.delete(workspaceId);
      } else {
        newSet.add(workspaceId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <aside className="w-[240px] h-full hidden md:flex flex-col border-r border-border-light dark:border-border-dark bg-sidebar-light dark:bg-sidebar-dark">
        <div className="p-2">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const favorites = getFavorites();

  return (
    <aside className="w-[240px] h-full hidden md:flex flex-col border-r border-border-light dark:border-border-dark bg-sidebar-light dark:bg-sidebar-dark transition-colors duration-200 text-[14px]">
      <div className="p-2 flex flex-col h-full">
        {/* Workspace Header */}
        <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-hover-light dark:hover:bg-hover-dark rounded-md cursor-pointer transition-colors group mb-2">
          <div className="size-5 rounded-sm bg-slate-800 dark:bg-[#e3e3e3] text-white dark:text-black flex items-center justify-center text-xs font-bold shadow-sm">
            {workspaceData.workspace.logo}
          </div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <h1 className="font-medium leading-none truncate text-slate-700 dark:text-[#ebebeb]">
              {workspaceData.workspace.name}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <HiOutlineEllipsisHorizontal size={16} className="text-slate-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 mb-4">
          <a
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-hover-light dark:hover:bg-hover-dark transition-colors"
            href="#"
          >
            <HiOutlineMagnifyingGlass size={18} />
            <span className="font-medium">Search</span>
          </a>
          <a
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-hover-light dark:hover:bg-hover-dark transition-colors"
            href="#"
          >
            <HiOutlineClock size={18} />
            <span className="font-medium">Updates</span>
          </a>
          <a
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-hover-light dark:hover:bg-hover-dark transition-colors"
            href="#"
          >
            <HiOutlineCog6Tooth size={18} />
            <span className="font-medium">Settings</span>
          </a>
        </nav>

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="mb-4">
            <h3 className="px-2 text-[11px] font-semibold text-slate-400 dark:text-[#6a6a6a] mb-1">
              Favorites
            </h3>
            <div className="flex flex-col gap-0.5">
              {favorites.map((doc) => (
                <a
                  key={doc.id}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-hover-light dark:hover:bg-hover-dark transition-colors group"
                  href="#"
                >
                  <HiOutlineDocumentText size={16} className="text-slate-400 dark:text-[#888]" />
                  <span className="truncate">{doc.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Workspaces & Documents Section */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between px-2 mb-1">
            <h3 className="text-[11px] font-semibold text-slate-400 dark:text-[#6a6a6a]">
              Workspaces
            </h3>
            {onNewPageClick && (
              <button
                onClick={onNewPageClick}
                className="p-0.5 hover:bg-hover-light dark:hover:bg-hover-dark rounded transition-colors"
                title="New workspace"
              >
                <HiOutlinePlus size={14} className="text-slate-400 dark:text-[#888]" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            {workSpaces.length === 0 ? (
              <div className="px-2 py-4 text-center">
                <p className="text-sm text-slate-400 dark:text-[#666] mb-2">
                  No workspaces yet
                </p>
              </div>
            ) : (
              workSpaces.map((workspace: any) => {
                const isOpen = openWorkspaces.has(workspace.id);
                const documents = workspace.documents || [];

                return (
                  <div key={workspace.id}>
                    {/* Workspace Item */}
                    <div
                      className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-hover-light dark:hover:bg-hover-dark transition-colors cursor-pointer group ${
                        workspaceId === workspace.id ? 'bg-hover-light dark:bg-hover-dark' : ''
                      }`}
                      onClick={() => toggleWorkspace(workspace.id)}
                    >
                      <HiOutlineChevronRight
                        size={12}
                        className={`text-slate-400 dark:text-[#888] transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      />
                      <HiOutlineFolder size={16} className="text-slate-500 dark:text-[#888]" />
                      <span className="truncate flex-1">{workspace.title}</span>
                      <span className="text-xs text-slate-400 dark:text-[#666] opacity-0 group-hover:opacity-100 transition-opacity">
                        {documents.length}
                      </span>
                    </div>

                    {/* Nested Documents */}
                    {isOpen && (
                      <div className="flex flex-col gap-0.5 ml-[22px] border-l border-gray-200 dark:border-[#383838] pl-1 mt-0.5">
                        {documents.length === 0 ? (
                          <div className="px-2 py-1 text-xs text-slate-400 dark:text-[#666]">
                            No documents
                          </div>
                        ) : (
                          documents.map((doc: any) => (
                            <Link
                              key={doc.id}
                              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-hover-light dark:hover:bg-hover-dark transition-colors group"
                              href={`/dashboard/workspace/${workspace.id}/document/${doc.id}`}
                            >
                              <div className="size-1 bg-slate-400 rounded-full ml-1 mr-1.5 opacity-50"></div>
                              <HiOutlineDocumentText 
                                size={14} 
                                className="text-slate-400 dark:text-[#888] flex-shrink-0" 
                              />
                              <span className="truncate flex-1">{doc.title}</span>
                              {doc.isFavorite && (
                                <span className="text-yellow-500 text-xs">★</span>
                              )}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};