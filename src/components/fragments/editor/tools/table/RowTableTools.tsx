import { useEffect, useRef } from "react";
import tippy, { Instance } from "tippy.js";
import { TbRowInsertBottom, TbRowInsertTop, TbRowRemove } from "react-icons/tb";
import { Editor } from "@tiptap/core";

interface Props {
  parentRef: React.RefObject<HTMLDivElement | null>;
  editor: Editor;
}

export const RowTableTools = ({ parentRef, editor }: Props) => {
  const toolRef = useRef<HTMLDivElement | null>(null);
  const tippyInstance = useRef<Instance | null>(null);
  
  useEffect(() => {
    if (tippyInstance.current) {
      tippyInstance.current.destroy();
      tippyInstance.current = null;
    }

    if (!toolRef.current || !parentRef.current) return;

    const instance = tippy(parentRef.current, {
      content: toolRef.current,
      trigger: "click",
      placement: "bottom",
      appendTo: parentRef.current,
      animation: "shift-toward",
      duration: 300,
      offset: [0, 6],
      interactive: true,
      onCreate: (instance) => {
        instance.popper.classList.add(
          "max-md:!sticky",
          "max-md:!bottom-0",
          "max-md:!top-auto",
          "max-md:!transform-none"
        );
      },
    });

    tippyInstance.current = instance;

    return () => {
      if (tippyInstance.current) {
        tippyInstance.current.destroy();
        tippyInstance.current = null;
      }
    };
  }, [parentRef]);

  return (
    <>
      <div
        ref={toolRef}
        className="text-sm min-w-[180px] bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg p-2 flex flex-col gap-1"
      >
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-text-light dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 w-full text-left"
          onClick={() => {
            editor.chain().focus().addRowBefore().run();
            tippyInstance.current?.hide();
          }}
        >
          <TbRowInsertTop size={20} className="flex-shrink-0" />
          <span>Add Row Before</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-text-light dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 w-full text-left"
          onClick={() => {
            editor.chain().focus().addRowAfter().run();
            tippyInstance.current?.hide();
          }}
        >
          <TbRowInsertBottom size={20} className="flex-shrink-0" />
          <span>Add Row After</span>
        </button>
        <div className="h-px bg-border-light dark:bg-border-dark my-1" />
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 w-full text-left"
          onClick={() => {
            editor.chain().focus().deleteRow().run();
            tippyInstance.current?.hide();
          }}
        >
          <TbRowRemove size={20} className="flex-shrink-0" />
          <span>Remove Row</span>
        </button>
      </div>
    </>
  );
};