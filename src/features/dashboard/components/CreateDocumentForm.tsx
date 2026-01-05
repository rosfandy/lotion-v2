"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { useDocument } from "@/features/document/hook/useDocument";

interface CreateDocumentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateDocumentForm = ({ onSuccess, onCancel }: CreateDocumentFormProps) => {
  const { createDocument } = useDocument();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<'document' | 'folder'>('document');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsSubmitting(true);

    try {
      createDocument({
        title: title.trim(),
        type,
        // Documents akan dibuat di root level (tidak ada parentId)
      });

      setTitle("");
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create document:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-[#202020] rounded-lg border border-border-light dark:border-border-dark shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Create New Document
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Title" htmlFor="title">
          <Input
            id="title"
            type="text"
            placeholder="Enter document title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </FormField>

        <FormField label="Type" htmlFor="type">
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'document' | 'folder')}
            className="block w-full rounded-lg border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#151515] text-slate-900 dark:text-white px-3 py-2.5 text-sm focus:border-primary focus:ring-primary/20 focus:ring-2 focus:bg-white dark:focus:bg-[#1a1a1a] transition-all duration-200"
            disabled={isSubmitting}
          >
            <option value="document">📄 Document</option>
            <option value="folder">📁 Folder</option>
          </select>
        </FormField>

        <div className="flex gap-2 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting || !title.trim()}
            className="flex-1"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};