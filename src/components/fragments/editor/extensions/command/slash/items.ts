import { Group } from "@/types/editor.type";

import type { Extensions } from "@tiptap/core";
import type { HeadingOptions } from "@tiptap/extension-heading";
import { LuCode, LuHeading1, LuHeading2, LuHeading3, LuListOrdered, LuPilcrow, LuTable, LuUpload } from "react-icons/lu";

export function slashMenuItems(extensions: Extensions) {
  const groups: Group[] = [
    {
      name: "format",
      title: "Inline Text",
      commands: [],
    },
    {
      name: "insert",
      title: "Insert Node",
      commands: [],
    },
  ];

  const headingIcons = {
    1: LuHeading1,
    2: LuHeading2,
    3: LuHeading3,
  };

  extensions.forEach((extension) => {
    if (extension.name.toLowerCase() === "heading") {
      extension.options.levels.forEach(
        (level: HeadingOptions["levels"][number]) => {
          if (level === 1 || level === 2 || level === 3) {
            groups[0].commands.push({
              name: `heading${level}`,
              label: "Heading",
              aliases: [`h${level}`, "bt", `bt${level}`],
              icon: headingIcons[level],
              description: `Heading level ${level}`,
              action: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setHeading({ level })
                  .run();
              },
            });
          }
        }
      );
    }

    if (extension.name.toLowerCase() === "paragraph") {
      groups[0].commands.push({
        name: "paragraph",
        label: "Paragraph",
        aliases: ["ul", "yxlb"],
        icon: LuPilcrow,
        description: "Create a simple text",
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("paragraph").run();
        },
      });
    }

    if (extension.name.toLowerCase() === "codeblock") {
      groups[0].commands.push({
        name: "codeblock",
        label: "CodeBlock",
        icon: LuCode,
        description: "Capture a code snippet",
        action: ({ editor }) => {
          editor.commands.setCodeBlock();
        },
      });
    }

    if (extension.name.toLowerCase() === "orderedlist") {
      groups[0].commands.push({
        name: "orderedlist",
        label: "OrderedList",
        aliases: ["ol", "yxlb"],
        icon: LuListOrdered,
        description: "Create an ordered list",
        action: ({ editor }) => {
          editor.commands.toggleOrderedList();
        },
      });
    }

    if (extension.name.toLowerCase() === "table") {
      groups[1].commands.push({
        name: "table",
        label: "Table",
        icon: LuTable,
        description: "Insert a 3×3 table",
        action: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
        },
      });
    }
  });

  return groups;
}
