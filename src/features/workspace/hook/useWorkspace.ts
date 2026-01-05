import { useState, useEffect, useCallback, useRef } from 'react';
import { WorkSpace } from '../types/workspace.type';
import { MdArchive, MdDescription, MdFolderShared, MdMap, MdRocketLaunch } from 'react-icons/md';
import { IconType } from 'react-icons';
import { Document } from '@/features/document/types/document.type';

const iconMap: Record<string, IconType> = {
    MdRocketLaunch,
    MdDescription,
    MdMap,
    MdFolderShared,
    MdArchive
};

const STORAGE_KEY = 'WorkSpace';

// Safe localStorage helpers
const getLocalStorage = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error('Failed to access localStorage:', error);
        return null;
    }
};

const setLocalStorage = (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error('Failed to write to localStorage:', error);
    }
};

const loadWorkSpace = (): WorkSpace[] => {
    try {
        const stored = getLocalStorage(STORAGE_KEY);
        if (stored) {
            const parsed: Omit<WorkSpace, 'icon'>[] = JSON.parse(stored);
            return parsed.map(ws => ({
                ...ws,
                icon: iconMap[ws.iconName] || MdRocketLaunch
            }));
        }
        return [];
    } catch (error) {
        console.error('Failed to load workspaces from localStorage:', error);
        return [];
    }
};

const saveWorkSpace = (WorkSpace: WorkSpace[]) => {
    try {
        // Remove icon property before saving (we only save iconName)
        const toSave = WorkSpace.map(({ icon, ...rest }) => rest);
        setLocalStorage(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
        console.error('Failed to save WorkSpace to localStorage:', error);
    }
};

// Helper function untuk format relative time
const getRelativeTime = (date: string | Date): string => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return past.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

// Interface untuk document updates
interface DocumentUpdate {
    title?: string;
    content?: string;
    description?: string;
    updatedAt?: string;
}

export const useWorkSpace = () => {
    const [WorkSpaces, setWorkSpaces] = useState<WorkSpace[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const loaded = loadWorkSpace();
        setWorkSpaces(loaded);
        setIsInitialized(true);
    }, []);

    // Auto-save to localStorage whenever WorkSpaces changes (after initial load)
    useEffect(() => {
        if (isInitialized) {
            saveWorkSpace(WorkSpaces);
        }
    }, [WorkSpaces, isInitialized]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
                updateTimeoutRef.current = null;
            }
        };
    }, []);

    const createWorkSpace = useCallback((data: Omit<WorkSpace, 'id'>) => {
        const newWorkSpace: WorkSpace = {
            ...data,
            id: Date.now().toString(),
            iconName: Object.keys(iconMap).find(key => iconMap[key] === data.icon) || 'MdRocketLaunch',
            createdAt: data.createdAt || new Date().toISOString(),
            lastEdited: 'just now',
        };
        setWorkSpaces(prev => [...prev, newWorkSpace]);
        return newWorkSpace;
    }, []);

    const readWorkSpace = useCallback(() => {
        return WorkSpaces;
    }, [WorkSpaces]);

    const updateWorkSpace = useCallback((id: string, data: Partial<WorkSpace>) => {
        setWorkSpaces(prev =>
            prev.map(workSpace =>
                workSpace.id === id 
                    ? { 
                        ...workSpace, 
                        ...data,
                        lastEdited: 'just now'
                    } 
                    : workSpace
            )
        );
    }, []);

    const deleteWorkSpace = useCallback((id: string) => {
        setWorkSpaces(prev => prev.filter(workSpace => workSpace.id !== id));
    }, []);

    const getWorkSpaces = useCallback(() => {
        return WorkSpaces;
    }, [WorkSpaces]);

    const getWorkSpaceById = useCallback((id: string) => {
        return WorkSpaces.find(workSpace => workSpace.id === id);
    }, [WorkSpaces]);

    /**
     * Update document dalam workspace dengan debounce
     * Menghindari terlalu banyak update saat user mengetik
     */
    const updateDocumentInWorkspace = useCallback((
        workspaceId: string, 
        documentId: string, 
        updates: DocumentUpdate,
        debounceMs: number = 500
    ) => {
        // Clear previous timeout
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }

        // Set new timeout for debounced update
        updateTimeoutRef.current = setTimeout(() => {
            setWorkSpaces(prev =>
                prev.map(workspace => {
                    if (workspace.id === workspaceId) {
                        const updatedDocs = workspace.documents?.map(doc => {
                            if (doc.id === documentId) {
                                return {
                                    ...doc,
                                    ...updates,
                                    updatedAt: updates.updatedAt || new Date().toISOString(),
                                };
                            }
                            return doc;
                        }) || [];

                        return {
                            ...workspace,
                            documents: updatedDocs,
                            lastEdited: 'just now',
                        };
                    }
                    return workspace;
                })
            );
        }, debounceMs);
    }, []);

    /**
     * Update document langsung tanpa debounce
     * Gunakan untuk operasi yang perlu instant update
     */
    const updateDocumentInWorkspaceImmediate = useCallback((
        workspaceId: string, 
        documentId: string, 
        updates: DocumentUpdate
    ) => {
        setWorkSpaces(prev =>
            prev.map(workspace => {
                if (workspace.id === workspaceId) {
                    const updatedDocs = workspace.documents?.map(doc => {
                        if (doc.id === documentId) {
                            return {
                                ...doc,
                                ...updates,
                                updatedAt: updates.updatedAt || new Date().toISOString(),
                            };
                        }
                        return doc;
                    }) || [];

                    return {
                        ...workspace,
                        documents: updatedDocs,
                        lastEdited: 'just now',
                    };
                }
                return workspace;
            })
        );
    }, []);

    /**
     * Tambah document baru ke workspace
     */
    const addDocumentToWorkspace = useCallback((
        workspaceId: string,
        document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
        const newDocument: Document = {
            ...document,
            id: `doc_${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setWorkSpaces(prev =>
            prev.map(workspace => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        documents: [...(workspace.documents || []), newDocument],
                        lastEdited: 'just now',
                    };
                }
                return workspace;
            })
        );

        return newDocument;
    }, []);

    /**
     * Hapus document dari workspace
     */
    const deleteDocumentFromWorkspace = useCallback((
        workspaceId: string,
        documentId: string
    ) => {
        setWorkSpaces(prev =>
            prev.map(workspace => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        documents: workspace.documents?.filter(doc => doc.id !== documentId) || [],
                        lastEdited: 'just now',
                    };
                }
                return workspace;
            })
        );
    }, []);

    /**
     * Get document by ID dari workspace tertentu
     */
    const getDocumentById = useCallback((
        workspaceId: string,
        documentId: string
    ) => {
        const workspace = WorkSpaces.find(ws => ws.id === workspaceId);
        return workspace?.documents?.find(doc => doc.id === documentId);
    }, [WorkSpaces]);

    return {
        WorkSpaces,
        createWorkSpace,
        readWorkSpace,
        updateWorkSpace,
        deleteWorkSpace,
        getWorkSpaces,
        getWorkSpaceById,
        updateDocumentInWorkspace,
        updateDocumentInWorkspaceImmediate,
        addDocumentToWorkspace,
        deleteDocumentFromWorkspace,
        getDocumentById,
    };
};