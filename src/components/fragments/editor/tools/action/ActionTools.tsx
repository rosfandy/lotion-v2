import { Editor } from "@tiptap/core";
import { useEffect, useRef } from "react";
import { LuHeading1, LuHeading2, LuHeading3, LuList, LuListOrdered, LuType } from "react-icons/lu";
import tippy, { Instance } from "tippy.js";

interface Props {
  editor: Editor;
  referenceElement: HTMLDivElement | null;
}

export interface ActionToolItemType {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const paragraphItems = (editor: Editor): ActionToolItemType[] => [
  {
    key: "paragraph",
    icon: <LuType size={20} />,
    label: "Paragraph",
    onClick: () => editor.chain().focus().setParagraph().run(),
  },
  {
    key: "heading1",
    icon: <LuHeading1 size={20} />,
    label: "Heading 1",
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    key: "heading2",
    icon: <LuHeading2 size={20} />,
    label: "Heading 2",
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    key: "heading3",
    icon: <LuHeading3 size={20} />,
    label: "Heading 3",
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
];

export const ActionTools = ({ editor, referenceElement }: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const instance = useRef<Instance | null>(null);

  const listItems: ActionToolItemType[] = [
    {
      key: "unorderedList",
      icon: <LuList size={20} />,
      label: "Unordered List",
      onClick: () => {
        editor.chain().focus().toggleBulletList().run();
      },
    },
    {
      key: "orderedList",
      icon: <LuListOrdered size={20} />,
      label: "Ordered List",
      onClick: () => {
        editor.chain().focus().toggleOrderedList().run();
      },
    },
  ];

  useEffect(() => {
    if (!referenceElement || !contentRef.current) return;

    instance.current = tippy(referenceElement, {
      content: contentRef.current,
      trigger: "mouseenter",
      placement: "right-start",
      animation: "shift-toward",
      interactive: true,
    });

    return () => {
      if (instance.current) {
        instance.current.destroy();
        instance.current = null;
      }
    };
  }, [editor, referenceElement]);

  return (
    <>
      <div
        ref={contentRef}
        className="flex flex-col bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg min-w-[200px]"
      >
        <div className="border-b border-border-light dark:border-border-dark px-3 py-3">
          <div className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2 uppercase tracking-wide">
            Text
          </div>
          <div className="flex items-center gap-1">
            {paragraphItems(editor).map((item) => (
              <button
                key={item.key}
                className="flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                onClick={() => {
                  item.onClick();
                  instance.current?.hide();
                }}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-3">
          <div className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2 uppercase tracking-wide">
            List
          </div>
          <div className="flex items-center gap-1">
            {listItems.map((item) => (
              <button
                key={item.key}
                className="flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                onClick={() => {
                  item.onClick();
                  instance.current?.hide();
                }}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};