"use client";

import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useWorkSpace } from "../hook/useWorkspace";
import { WorkSpace } from "../types/workspace.type";
import { Modal } from "@/components/fragments/Modal";
import { WorkspaceForm } from "./WorkspaceForm";
import { WorkspaceCard } from "./WorkspaceCard";
import { usePathname, useRouter } from "next/navigation";

export const WorkspaceList = () => {
    const { WorkSpaces, createWorkSpace, updateWorkSpace, deleteWorkSpace } =
        useWorkSpace();
    const [mounted, setMounted] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingWorkspace, setEditingWorkspace] =
        useState<WorkSpace | null>(null);

    const router = useRouter();
    const pathname = usePathname()

    /* ================= HYDRATION GUARD ================= */
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    /* ================= HANDLERS ================= */
    const handleCreate = (data: any) => {
        createWorkSpace({
            ...data,
            documentCount: 0,
            documents: [],
            lastEdited: "just now",
            isArchived: false,
        });
        setIsCreateModalOpen(false);
    };

    const handleEdit = (workspace: WorkSpace) => {
        setEditingWorkspace(workspace);
        setIsCreateModalOpen(true);
    };

    const handleUpdate = (data: any) => {
        if (!editingWorkspace) return;

        updateWorkSpace(editingWorkspace.id, {
            ...data,
            isArchived: editingWorkspace.isArchived,
        });

        setIsCreateModalOpen(false);
        setEditingWorkspace(null);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this workspace?")) {
            deleteWorkSpace(id);
        }
    };

    const openCreateModal = () => {
        setEditingWorkspace(null);
        setIsCreateModalOpen(true);
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setEditingWorkspace(null);
    };

    /* ================= RENDER ================= */
    return (
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light-main dark:bg-background-dark-main">
            <div className="flex-1 overflow-y-auto p-8 md:px-12 md:py-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1">
                                Workspaces
                            </h1>
                            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                                Manage your projects and teams
                            </p>
                        </div>

                        <button
                            onClick={openCreateModal}
                            className="bg-primary hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200 text-sm flex items-center gap-2"
                        >
                            <MdAdd size={20} />
                            Create New
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {WorkSpaces.map((workspace) => (
                            <WorkspaceCard
                                key={workspace.id}
                                workspace={workspace}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onClick={() => router.push(`${pathname}/workspace/` + workspace.id)}
                            />
                        ))}

                        {/* Create Card */}
                        <div
                            onClick={openCreateModal}
                            className="group border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-5 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center h-48 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 flex items-center justify-center text-gray-400 group-hover:text-primary mb-3 transition-colors">
                                <MdAdd size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-text-light-secondary group-hover:text-primary transition-colors">
                                Create new workspace
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile FAB */}
            <button
                onClick={openCreateModal}
                className="md:hidden absolute bottom-20 right-6 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-blue-600 transition-all z-40"
            >
                <MdAdd size={24} />
            </button>

            {/* Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={closeModal}
                title={editingWorkspace ? "Edit Workspace" : "Create New Workspace"}
            >
                <WorkspaceForm
                    initialData={
                        editingWorkspace
                            ? {
                                title: editingWorkspace.title,
                                type:
                                    editingWorkspace.type === "Archived"
                                        ? "Private"
                                        : editingWorkspace.type,
                                description: editingWorkspace.description,
                                iconName: editingWorkspace.iconName,
                                iconColor: editingWorkspace.iconColor,
                            }
                            : undefined
                    }
                    onSubmit={editingWorkspace ? handleUpdate : handleCreate}
                    onCancel={closeModal}
                />
            </Modal>
        </main>
    );
};