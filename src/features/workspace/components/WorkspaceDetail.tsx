import { useState } from "react";
import { MdDescription, MdLock, MdLockOpen, MdEdit, MdDelete } from "react-icons/md";
import { WorkSpace } from "../types/workspace.type";
import { CreateDocument } from "./CreateDocument";
import { usePathname, useRouter } from "next/navigation";

interface WorkspaceDetailProps {
    workspace: WorkSpace;
    onCreateDocument: (data: { title: string; description: string }) => void;
    onEditDocument: (documentId: string, data: { title: string; description: string; }) => void;
    onDeleteDocument: (documentId: string) => void;
}

export const WorkspaceDetail = ({ workspace, onCreateDocument, onEditDocument, onDeleteDocument }: WorkspaceDetailProps) => {
    const Icon = workspace.icon;
    const documents = workspace.documents;

    const [editData, setEditData] = useState<{ id: string; title: string; description: string; } | null>(null);
    const router = useRouter()
    const pathname = usePathname()

    const handleEdit = (doc: any) => {
        setEditData({ id: doc.id, title: doc.title, description: doc.description });
    };

    const handleEditSubmit = (documentId: string, data: { title: string; description: string; }) => {
        onEditDocument(documentId, data);
        setEditData(null);
    };

    return (
        <div className="">
            <div className="w-full h-[20vh] bg-gradient-to-br from-indigo-400/80 via-purple-400/60 to-pink-400/80" />
            <div className="mx-auto max-w-5xl p-8">
                <div className="flex flex-col mb-8 group relative">
                    <div className="flex items-center mb-4">
                        <div className={`w-16 h-16 rounded ${workspace.iconColor === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} flex items-center justify-center mr-4 text-3xl`}>
                            <Icon />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1">
                                {workspace.title}
                            </h1>
                            <div className="flex items-center text-xs text-text-light-secondary dark:text-text-dark-secondary space-x-3">
                                <span className="flex items-center gap-1">
                                    {workspace.type === "Private" ? <MdLock /> : <MdLockOpen />}
                                    {workspace.type}
                                </span>
                                <span>•</span>
                                <span>{workspace.lastEdited}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-text-light-primary dark:text-text-dark-primary border-l-2 border-border-light dark:border-border-dark pl-4 italic text-lg opacity-80">
                        {workspace.description}
                    </p>
                </div>

                <div className="space-y-1">
                    {documents && documents.length > 0 ? (
                        documents.map((doc: any) => (
                            <div
                                key={doc.id}
                                onClick={() => router.push(`${pathname}/document/${doc.id}`)}
                                className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors border border-transparent hover:border-border-light dark:hover:border-border-dark relative"
                            >
                                <div className="flex items-center flex-1 min-w-0">
                                    <div className="w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mr-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        <MdDescription size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary truncate">
                                            {doc.title}
                                        </h4>
                                        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">
                                            {doc.description || "No description"}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(doc); }}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                                    >
                                        <MdEdit />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDeleteDocument(doc.id); }}
                                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-300 p-1"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-text-light-secondary dark:text-text-dark-secondary">
                            No documents yet
                        </div>
                    )}
                </div>

                <CreateDocument
                    workspaceId={workspace.id}
                    onCreate={onCreateDocument}
                    onEdit={handleEditSubmit}
                    editData={editData || undefined}
                    onCancelEdit={() => setEditData(null)}
                />
            </div>
        </div>
    );
};