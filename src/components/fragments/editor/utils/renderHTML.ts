import { generateHTML, JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import { Figma } from "../extensions/figma";
import { WordNode } from "../extensions/words";
import { Title } from "../extensions/title";

export function renderJSONToHTML(content: JSONContent) {
  if (!content) return "";

  return generateHTML(content, [
    StarterKit,
    Figma,
    TableKit.configure({ table: { resizable: true } }),
    Figma,
    WordNode,
    Title,
  ]);
}
