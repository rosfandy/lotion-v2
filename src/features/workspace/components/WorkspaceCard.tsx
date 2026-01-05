import { MdEdit, MdDelete } from "react-icons/md";
import { WorkSpace } from "../types/workspace.type";

interface WorkspaceCardProps {
    workspace: WorkSpace;
    onEdit: (workspace: WorkSpace) => void;
    onDelete: (id: string) => void;
    onClick?: () => void;
}

/* ================= COLOR MAP ================= */
const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    gray: "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
};

export const WorkspaceCard = ({ workspace, onEdit, onDelete, onClick }: WorkspaceCardProps) => {
    const Icon = workspace.icon;

    return (
        <div
            onClick={onClick}
            className={`group ${workspace.isArchived
                ? "bg-gray-50 dark:bg-[#1f1f1f] opacity-75 hover:opacity-100 hover:shadow-md"
                : "bg-card-light dark:bg-card-dark hover:shadow-lg dark:hover:border-gray-600"
                } border border-border-light dark:border-border-dark rounded-lg p-5 transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} flex flex-col h-48 relative`}
        >
            {/* Actions */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(workspace); }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 cursor-pointer"
                >
                    <MdEdit />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(workspace.id); }}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-300 p-1 cursor-pointer"
                >
                    <MdDelete />
                </button>
            </div>

            {/* Header */}
            <div className="flex items-center mb-4">
                <div
                    className={`w-10 h-10 rounded flex items-center justify-center mr-3 ${colorClasses[workspace.iconColor] ?? colorClasses.indigo
                        }`}
                >
                    <Icon size={24} />
                </div>

                <div>
                    <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary">
                        {workspace.title}
                    </h3>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                        {workspace.type}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary line-clamp-2 flex-grow">
                {workspace.description}
            </p>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark flex items-center justify-between text-xs text-text-light-secondary dark:text-text-dark-secondary">
                <span>{workspace.documentCount} documents</span>
                <span>Edited {workspace.lastEdited}</span>
            </div>
        </div>
    );
};