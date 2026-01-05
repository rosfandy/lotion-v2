"use client";

import { Button } from "@/components/ui";
import { MdDescription, MdIceSkating } from "react-icons/md";
import { useEffect, useState } from "react";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useParams } from "next/navigation";
import { useWorkSpace } from "@/features/workspace/hook/useWorkspace";
import Editor from "@/components/fragments/editor/CollabEditor";

const DocumentPage = () => {
  const { workspaceId, documentId } = useParams();
  const { setItems } = useBreadcrumb();
  const { getWorkSpaceById, updateDocumentInWorkspace } = useWorkSpace();
  const [mounted, setMounted] = useState(false);

  const workSpace = getWorkSpaceById(workspaceId as string);
  const document = workSpace?.documents?.find(doc => doc.id === documentId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && workSpace && document) {
      setItems([
        { label: 'Dashboard', href: '/dashboard' },
        { label: workSpace.title, href: `/dashboard/workspace/${workspaceId}` },
        { label: document.title },
      ]);
    }
  }, [setItems, workspaceId, documentId, workSpace, document, mounted]);

  const handleEditorChange = (content: string) => {
    if (document && workspaceId && documentId) {
      updateDocumentInWorkspace(workspaceId as string, documentId as string, {
        content,
        updatedAt: new Date().toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      });
    }
  };

  if (!mounted) {
    return (
      <div className="">
        <div className="w-full h-[20vh] bg-gradient-to-br from-indigo-400/80 via-purple-400/60 to-pink-400/80" />
        <div className="mx-auto max-w-5xl p-8">
          <div className="flex flex-col mb-8">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse mr-4" />
              <div className="flex-1">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-64" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!workSpace || !document) {
    return (
      <div className="">
        <div className="w-full h-[20vh] bg-gradient-to-br from-indigo-400/80 via-purple-400/60 to-pink-400/80" />
        <div className="mx-auto max-w-5xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark-primary">
              Document not found
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-[20vh] bg-gradient-to-br from-indigo-400/80 via-purple-400/60 to-pink-400/80" />
      <div className="mx-auto max-w-5xl p-8">
        <div className="flex flex-col mb-8">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4 text-3xl">
              <MdDescription />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-text-light dark:text-text-dark-primary mb-1">
                {document.title}
              </h1>
              <div className="flex items-center text-xs text-text-light-secondary dark:text-text-dark-secondary space-x-3">
                <span>{document.updatedAt}</span>
              </div>
            </div>
          </div>
          {document.description && (
            <p className="text-text-light dark:text-text-dark-primary border-l-2 border-border-light dark:border-border-dark pl-4 italic text-lg opacity-80">
              {document.description}
            </p>
          )}
        </div>

        <div >
          <Editor 
            initialContent={document.content}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default DocumentPage;