import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Modal } from "@/components/fragments/Modal";

interface CreateDocumentProps {
    workspaceId: string;
    onCreate: (data: { title: string; description: string;  }) => void;
    onEdit?: (documentId: string, data: { title: string; description: string;  }) => void;
    editData?: { id: string; title: string; description: string;  };
    onCancelEdit?: () => void;
}

export const CreateDocument = ({ workspaceId, onCreate, onEdit, editData, onCancelEdit }: CreateDocumentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Initialize with empty strings to always keep inputs controlled
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const isEditing = !!editData;

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || "");
            setDescription(editData.description || "");
            setIsModalOpen(true);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [editData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            if (isEditing && onEdit && editData) {
                onEdit(editData.id, { title, description });
            } else {
                onCreate({ title, description });
            }
            setTitle("");
            setDescription("");
            setIsModalOpen(false);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    return (
        <>
            <div className="mt-4 pt-4 border-t border-dashed border-border-light dark:border-border-dark">
                <button
                    onClick={openModal}
                    className="flex items-center text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary transition-colors"
                >
                    <MdAdd size={20} />
                    Add Document
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={isEditing ? "Edit Document" : "Create New Document"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Title" htmlFor="title">
                        <Input
                            id="title"
                            type="text"
                            placeholder="Document title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </FormField>
                    <FormField label="Description" htmlFor="description">
                        <Input
                            id="description"
                            type="text"
                            placeholder="Document description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormField>

                    <div className="flex gap-2">
                        <Button type="submit" size="sm" variant="primary">
                            {isEditing ? "Update" : "Create"}
                        </Button>
                        <Button type="button" size="sm" variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};