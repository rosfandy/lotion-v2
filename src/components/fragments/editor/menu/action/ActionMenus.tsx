import { createPortal } from "react-dom";
import { Editor } from "@tiptap/core";
import { ActionTools } from "../../tools/action/ActionTools";
import { useEffect, useRef, useState } from "react";
import "@/styles/tippy.css";
import { LuChevronRight, LuDelete } from "react-icons/lu";

interface Props {
  currentNode: any;
  editor: Editor;
  coord: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null;
}

export const ActionMenus = ({ currentNode, editor, coord }: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [refEl, setRefEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Setelah render pertama, set ref element ke state
    if (buttonRef.current) {
      setRefEl(buttonRef.current);
    }
  }, []);

  if (!coord) return null;

  const x = (coord.left + coord.right) / 2 - 150;
  const y = coord.top + 40;

  const handleDelete = () => {
    if (currentNode === "youtube" || currentNode === "image") {
      editor.chain().focus().selectNodeForward().deleteSelection().run();
    } else {
      editor.chain().focus().deleteNode(currentNode).blur().run();
    }
  };

  const menu = (
    <div
      className="absolute"
      style={{
        zIndex: 2147483647,
        top: `${y}px`,
        left: `${x}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="min-w-[180px] pointer-events-auto bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg p-2">
        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div ref={buttonRef} className="w-full">
            {buttonRef.current && (
              <ActionTools
                editor={editor}
                referenceElement={buttonRef.current}
              />
            )}
            <button
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-text-light dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 text-left text-sm"
            >
              <span>Paragraph Style</span>
              <LuChevronRight size={16} className="flex-shrink-0" />
            </button>
          </div>

          <div className="w-full h-px bg-border-light dark:bg-border-dark my-1" />

          <button
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 text-left text-sm"
            onClick={handleDelete}
          >
            <LuDelete size={16} className="flex-shrink-0" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Portal ke body biar keluar dari stacking context editor
  return createPortal(menu, document.body);
};