"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useWorkSpace } from "@/features/workspace/hook/useWorkspace";
import { WorkspaceDetail } from "@/features/workspace/components/WorkspaceDetail";

const WorkspacePage = () => {
    const { workspaceId } = useParams();
    const { setItems } = useBreadcrumb();
    const { getWorkSpaceById, updateWorkSpace } = useWorkSpace();
    const [mounted, setMounted] = useState(false);
    
    const workSpace = getWorkSpaceById(workspaceId as string);
    const documents = workSpace?.documents;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && workSpace) {
            setItems([
                { label: 'Dashboard', href: '/dashboard' },
                { label: workSpace.title },
            ]);
        }
    }, [setItems, workspaceId, workSpace, mounted]);

    const handleCreateDocument = (data: { title: string; description: string; }) => {
        if (workSpace) {
            const newDocument = {
                id: `doc_${Date.now()}`,
                title: data.title,
                description: data.description,
                type: 'document' as const,
                isFavorite: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const updatedDocuments = [...workSpace.documents, newDocument];
            updateWorkSpace(workSpace.id, { documents: updatedDocuments });
        }
    };

    const handleEditDocument = (documentId: string, data: { title: string; description: string; }) => {
        if (workSpace) {
            const updatedDocuments = workSpace.documents.map(doc =>
                doc.id === documentId ? {
                    ...doc,
                    title: data.title,
                    description: data.description,
                    updatedAt: new Date().toISOString()
                } : doc
            );
            updateWorkSpace(workSpace.id, { documents: updatedDocuments });
        }
    };

    const handleDeleteDocument = (documentId: string) => {
        if (workSpace && confirm("Are you sure you want to delete this document?")) {
            const updatedDocuments = workSpace.documents.filter(doc => doc.id !== documentId);
            updateWorkSpace(workSpace.id, { documents: updatedDocuments });
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

    if (!workSpace) {
        return (
            <div className="">
                <div className="w-full h-[20vh] bg-gradient-to-br from-indigo-400/80 via-purple-400/60 to-pink-400/80" />
                <div className="mx-auto max-w-5xl p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                            Workspace not found
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <WorkspaceDetail
                workspace={workSpace}
                onCreateDocument={handleCreateDocument}
                onEditDocument={handleEditDocument}
                onDeleteDocument={handleDeleteDocument}
            />
        </div>
    );
};

export default WorkspacePage;