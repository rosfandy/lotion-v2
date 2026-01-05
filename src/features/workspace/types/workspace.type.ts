import { Document } from "@/features/document/types/document.type";
import { IconType } from "react-icons";

export type WorkSpace = {
    id: string;
    title: string;
    type: 'Private' | 'Shared' | 'Archived';
    description: string;
    icon: IconType;
    iconName: string;
    iconColor: string;
    documentCount: number;
    documents: Document[];
    lastEdited: string;
    isArchived: boolean;
    createdAt?: string;
};