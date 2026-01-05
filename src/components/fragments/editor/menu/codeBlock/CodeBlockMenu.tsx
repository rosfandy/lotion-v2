import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import { ActionToolItemType } from "../../tools/action/ActionTools";
import { LuClipboard } from "react-icons/lu";

interface Props {
  coord: DOMRect | null;
  editor: Editor;
  nodeType: any;
}

export const codeToolItems = (editor: Editor): ActionToolItemType[] => [
  {
    key: "clipboard",
    icon: <LuClipboard className="!text-lg" />,
    label: "Copy",
    onClick: () => {
      const { state } = editor;
      const { selection } = state;
      const node = state.doc.nodeAt(selection.from);

      if (node && node.type.name === "codeBlock" && node.textContent) {
        navigator.clipboard
          .writeText(node.textContent)
          .then(() => {
            console.log("Copied to clipboard");
          })
          .catch((err) => {
            console.error("Failed to copy", err);
          });
      }
    },
  },
];

export const CodeBlockMenu = ({ coord, editor, nodeType }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (coord) {
      setPosition({
        x: coord.x,
        y: coord.y,
      });
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [coord]);

  if (!isVisible || !coord) return null;

  return <></>;
};
