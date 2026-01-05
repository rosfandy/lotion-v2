"use client";

import { useState, useEffect, useCallback } from "react";

export interface Document {
  id: string;
  title: string;
  description?: string;
  type: 'document' | 'folder';
  parentId?: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
  content?: string;
  children?: string[];
  isOpen?: boolean;
}

export interface WorkspaceData {
  workspace: {
    name: string;
    logo: string;
  };
  documents: Record<string, Document>; 
  favorites: string[]; 
  recent: string[]; 
}

const STORAGE_KEY = "lotion_workspace_data";

const createDefaultWorkspace = (): WorkspaceData => ({
  workspace: {
    name: "My Workspace",
    logo: "📝",
  },
  documents: {},
  favorites: [],
  recent: [],
});

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

export function useDocument() {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>(createDefaultWorkspace);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = getLocalStorage(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        setWorkspaceData(parsedData);
      } else {
        // Initialize with default data
        const defaultData = createDefaultWorkspace();
        setLocalStorage(STORAGE_KEY, JSON.stringify(defaultData));
        setWorkspaceData(defaultData);
      }
    } catch (error) {
      console.error("Failed to load workspace data:", error);
      const defaultData = createDefaultWorkspace();
      setWorkspaceData(defaultData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save data to localStorage whenever workspaceData changes
  useEffect(() => {
    if (!isLoading) {
      setLocalStorage(STORAGE_KEY, JSON.stringify(workspaceData));
    }
  }, [workspaceData, isLoading]);

  const createDocument = useCallback((data: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDoc: Document = {
      ...data,
      id: `doc_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setWorkspaceData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [newDoc.id]: newDoc,
      },
    }));

    // Add to parent's children if parent exists
    if (newDoc.parentId) {
      setWorkspaceData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [newDoc.parentId!]: {
            ...prev.documents[newDoc.parentId!],
            children: [...(prev.documents[newDoc.parentId!].children || []), newDoc.id],
            updatedAt: new Date().toISOString(),
          },
        },
      }));
    }

    return newDoc.id;
  }, []);

  const updateDocument = useCallback((id: string, updates: Partial<Document>) => {
    setWorkspaceData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [id]: {
          ...prev.documents[id],
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setWorkspaceData(prev => {
      const doc = prev.documents[id];
      const newDocuments = { ...prev.documents };
      delete newDocuments[id];

      // Remove from parent's children
      if (doc.parentId && newDocuments[doc.parentId]) {
        newDocuments[doc.parentId] = {
          ...newDocuments[doc.parentId],
          children: newDocuments[doc.parentId].children?.filter(childId => childId !== id),
          updatedAt: new Date().toISOString(),
        };
      }

      // Remove from favorites
      const newFavorites = prev.favorites.filter(favId => favId !== id);

      // Remove from recent
      const newRecent = prev.recent.filter(recId => recId !== id);

      return {
        ...prev,
        documents: newDocuments,
        favorites: newFavorites,
        recent: newRecent,
      };
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setWorkspaceData(prev => {
      const isFavorite = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: isFavorite
          ? prev.favorites.filter(favId => favId !== id)
          : [...prev.favorites, id],
        documents: {
          ...prev.documents,
          [id]: {
            ...prev.documents[id],
            isFavorite: !isFavorite,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const toggleFolder = useCallback((id: string) => {
    setWorkspaceData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [id]: {
          ...prev.documents[id],
          isOpen: !prev.documents[id].isOpen,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
  }, []);

  const addToRecent = useCallback((id: string) => {
    setWorkspaceData(prev => {
      const newRecent = [id, ...prev.recent.filter(recId => recId !== id)].slice(0, 10);
      return {
        ...prev,
        recent: newRecent,
      };
    });
  }, []);

  // Get documents by section
  const getFavorites = useCallback(() => {
    return workspaceData.favorites
      .map(id => workspaceData.documents[id])
      .filter(Boolean);
  }, [workspaceData]);

  const getRecent = useCallback(() => {
    return workspaceData.recent
      .map(id => workspaceData.documents[id])
      .filter(Boolean);
  }, [workspaceData]);

  const getDocumentsByParent = useCallback((parentId?: string) => {
    return Object.values(workspaceData.documents)
      .filter(doc => doc.parentId === parentId);
  }, [workspaceData]);

  const getWorkspaceTree = useCallback((): any[] => {
    const buildTree = (parentId?: string): any[] => {
      return Object.values(workspaceData.documents)
        .filter(doc => doc.parentId === parentId)
        .map(doc => ({
          ...doc,
          children: doc.type === 'folder' ? buildTree(doc.id) : undefined,
        }));
    };

    return buildTree();
  }, [workspaceData]);

  const getDocumentById = useCallback((id: string): Document | undefined => {
    return workspaceData.documents[id];
  }, [workspaceData]);

  return {
    // State
    workspaceData,
    isLoading,

    // Actions
    createDocument,
    updateDocument,
    deleteDocument,
    toggleFavorite,
    toggleFolder,
    addToRecent,

    // Getters
    getFavorites,
    getRecent,
    getDocumentsByParent,
    getWorkspaceTree,
    getDocumentById,
  };
}