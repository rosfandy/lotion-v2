
import { Editor } from "@tiptap/core";
import { Tooltip } from "antd";
import { TbTableRow } from "react-icons/tb";
import { AiOutlineMergeCells } from "react-icons/ai";

interface Props {
  editor: Editor;
}

interface ToolsType {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent) => void;
}

export const TableTools = ({ editor }: Props) => {
  const tools: ToolsType[] = [
    {
      key: "mergeTableCells",
      icon: <AiOutlineMergeCells className="!text-lg" />,
      label: "Merge Cells",
      onClick: (e: React.MouseEvent) => {
        editor.chain().focus().mergeCells().run();
      },
    },
    {
      key: "toggleHeaderCell",
      icon: <TbTableRow className="!text-lg" />,
      label: "Toggle Header",
      onClick: (e: React.MouseEvent) => {
        editor.chain().focus().toggleHeaderCell().run();
      },
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-[#454545] border border-black/10 dark:border-white/10 px-2 py-1 rounded-lg">
        <div className="flex items-center gap-x-2">
          {tools.map((item: ToolsType, index: number) => {
            return (
              <div key={item.key} className="pt-1">
                <Tooltip title={item.label} placement="top">
                  <button
                    className="w-full dark:hover:!bg-white/10"
                    onClick={(e) => {
                      item.onClick(e);
                      editor.commands.setTextSelection(
                        editor.state.selection.to
                      );
                    }}
                    onMouseDown={(e: React.MouseEvent) => {
                      e.preventDefault();
                    }}
                  >
                    {item.icon}
                  </button>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
