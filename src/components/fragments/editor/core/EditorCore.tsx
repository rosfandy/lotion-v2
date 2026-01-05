"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";
import { EditorView } from "@tiptap/pm/view";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { EditorExtensions } from "../extensions";
import {
  GetTableColumnCoords,
  GetTableRowCoords,
  GetTopLevelBlockCoords,
  GetTopLevelNode,
} from "../utils/pm-utils";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { RowTableMenu } from "../menu/table/RowTableMenu";
import { ColTableMenu } from "../menu/table/ColTableMenu";
import { TableMenu } from "../menu/table/TableMenu";
import { BubbleMenu } from "../menu/BubbleMenu";
import { CodeBlockMenu } from "../menu/codeBlock/CodeBlockMenu";
import { DragHandle } from "../extensions/dragHandler/DragHandler";
import { ActionMenus } from "../menu/action/ActionMenus";
import { LuGripVertical } from "react-icons/lu";
import "@/styles/tiptap.css"
interface EditorCoreProps {
  value: any;
  // ydoc: Y.Doc;
  status: string;
  onChange: (json: any) => void;
  // provider: any;
  useCollab?: boolean;
}

export default function EditorCore({
  value,
  // ydoc,
  status,
  onChange,
  // provider,
}: EditorCoreProps) {
  const [currentNodeType, setCurrentNodeType] = useState<string | null>(null);
  const [nodeCoord, setNodeCoord] = useState<any>(null);
  const [menuCoord, setMenuCoord] = useState<any>(null);
  const [tableRowCoord, setTableRowCoord] = useState<any>(null);
  const [tableColCoord, setTableColCoord] = useState<any>(null);
  const [isMenuClick, setIsMenuClick] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    content: value,
    extensions: EditorExtensions({
      // provider: provider as HocuspocusProvider,
      // ydoc,
    }),
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      const json = editor.getJSON();
      onChange(json);
    },
    immediatelyRender: false,
  });

  // Use useCallback to prevent unnecessary re-renders
  const getCurrentNode = useCallback(() => {
    if (!editor) return;

    try {
      const topNode = GetTopLevelNode(editor.view as EditorView);
      const nodeType = topNode?.type.name || null;
      setCurrentNodeType(nodeType);
    } catch (error) {
      console.warn("Error getting current node:", error);
      setCurrentNodeType(null);
    }
  }, [editor]);

  const getCoordNode = useCallback(() => {
    if (!editor) return;

    try {
      const coord = GetTopLevelBlockCoords(editor.view as EditorView);
      setNodeCoord(coord);
    } catch (error) {
      console.warn("Error getting node coordinates:", error);
      setNodeCoord(null);
    }
  }, [editor]);

  const getTableRowCoord = useCallback(() => {
    if (!editor) return;

    try {
      const coord = GetTableRowCoords(editor.view as EditorView);
      setTableRowCoord(coord);
    } catch (error) {
      console.warn("Error getting table row coordinates:", error);
      setTableRowCoord(null);
    }
  }, [editor]);

  const getTableColCoord = useCallback(() => {
    if (!editor) return;

    try {
      const coord = GetTableColumnCoords(editor.view as EditorView);
      setTableColCoord(coord);
    } catch (error) {
      console.warn("Error getting table column coordinates:", error);
      setTableColCoord(null);
    }
  }, [editor]);

  const updateAllCoords = useCallback(() => {
    getCurrentNode();
    getCoordNode();
    getTableRowCoord();
    getTableColCoord();
  }, [getCurrentNode, getCoordNode, getTableRowCoord, getTableColCoord]);

  const editorAddEventListener = useCallback(
    (editor: any) => {
      editor.on("selectionUpdate", updateAllCoords);
      editor.on("transaction", updateAllCoords);
    },
    [updateAllCoords]
  );

  const editorRemoveEventListener = useCallback(
    (editor: any) => {
      editor.off("selectionUpdate", updateAllCoords);
      editor.off("transaction", updateAllCoords);
    },
    [updateAllCoords]
  );

  useEffect(() => {
    if (!editor) return;

    updateAllCoords();
    editorAddEventListener(editor);

    const localeStorage = editor.storage as unknown as {
      wordNode: { locale: string };
    };

    // editor.commands.setLocale("id");
    // console.log("Current locale:", localeStorage.wordNode.locale);

    return () => {
      editorRemoveEventListener(editor);
      // Reset state
      setCurrentNodeType(null);
      setNodeCoord(null);
      setTableRowCoord(null);
      setTableColCoord(null);
    };
  }, [
    editor,
    updateAllCoords,
    editorAddEventListener,
    editorRemoveEventListener,
  ]);

  useEffect(() => {
    if (!isMenuClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      setIsMenuClick(false);
      setMenuCoord(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuClick]);

  if (!editor) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Initializing editor...</p>
          <p className="text-sm text-gray-500">Status: {status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="">
        <BubbleMenu editor={editor} currentNode={currentNodeType} />
        {isMenuClick && (
          <ActionMenus
            currentNode={currentNodeType}
            coord={menuCoord}
            editor={editor}
          />
        )}
        {currentNodeType === "table" && (
          <div className="">
            <TableMenu
              coord={nodeCoord}
              editor={editor}
              nodeType={currentNodeType}
            />
            <RowTableMenu coord={tableRowCoord} editor={editor} />
            <ColTableMenu coord={tableColCoord} editor={editor} />
          </div>
        )}
        {currentNodeType === "codeBlock" && (
          <CodeBlockMenu
            coord={nodeCoord}
            editor={editor}
            nodeType={currentNodeType}
          />
        )}
        <div ref={handleRef} className="cursor-pointer drag-handle">
          <DragHandle
            editor={editor}
            onNodeClick={({ node, pos, event }) => {
              setCurrentNodeType(node?.type.name || null);
              setIsMenuClick(!isMenuClick);

              // Menggunakan koordinat dari element yang diklik (event.currentTarget)
              if (event?.currentTarget) {
                try {
                  const clickedElement = event.currentTarget as HTMLElement;
                  const rect = clickedElement.getBoundingClientRect();

                  const menuRect = {
                    top: rect.top,
                    left: rect.left,
                    bottom: rect.bottom,
                    right: rect.right,
                    width: rect.width,
                    height: rect.height,
                    x: rect.x,
                    y: rect.y,
                  };

                  setMenuCoord(menuRect);
                  console.log("Clicked element coords:", menuRect);
                } catch (err) {
                  console.warn(
                    "Failed to get clicked element coordinates:",
                    err
                  );
                  setMenuCoord(null);
                }
              } else {
                setMenuCoord(null);
              }

              console.log("Klik handle, node:", node?.type.name, "pos:", pos);
            }}
          >
            <LuGripVertical className="drag-handle w-4 h-4 text-gray-400 hover:text-gray-600" />
          </DragHandle>
        </div>
        <EditorContent editor={editor} className="min-h-screen" />
      </div>
    </div>
  );
}
