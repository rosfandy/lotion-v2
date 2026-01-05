import React from "react";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";
import Dropcursor from "@tiptap/extension-dropcursor";
import SlashCommand from "./command/slash";
import { DocumentWithTitle, Title } from "./title";
import Collaboration from "@tiptap/extension-collaboration";
import Placeholder from "./Placeholder";
import { Gapcursor, UndoRedo } from "@tiptap/extensions";
import { TableKit } from "@tiptap/extension-table";
import Code from "@tiptap/extension-code";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import { BackgroundColor, TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "./lowlight";
import Youtube from "@tiptap/extension-youtube";
import { Awareness } from "y-protocols/awareness";
import * as Y from "yjs";
import { CustomCursor } from "./cursor/cursor";
import CleanPasteExtension from "./plainListPaste";
import { Figma } from "./figma";
import Document from "@tiptap/extension-document";
import { CommentMark } from "./commentMark/commentMark";
import { Editor } from "@tiptap/core";

interface EditorExtensionsProps {
  provider?: any;
  user?: any;
  ydoc?: Y.Doc;
  awareness?: Awareness | null;
  dictionary?: any;
  useTitle?: boolean;
  Editor?: Editor;
}

const lowlight = createLowlight();
lowlight.register(common);

export const EditorExtensions = ({
  provider,
  Editor,
  user,
  ydoc,
  awareness,
  dictionary = {},
  useTitle = true,
}: EditorExtensionsProps) => {
  const extensions = [
    UndoRedo,
    CleanPasteExtension,
    ...(useTitle ? [DocumentWithTitle, Title] : [Document]),

    Bold,
    Italic,
    Underline,
    Code,
    Strike,
    Highlight,
    TextStyle,
    BackgroundColor,
    Color,
    Subscript,
    Superscript,
    Paragraph,
    HorizontalRule,
    CommentMark,
    Youtube,
    Figma,
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    CodeBlockLowlight.configure({ lowlight }),
    Blockquote,
    BulletList,
    OrderedList,
    ListItem,
    HardBreak,
    Text,
    SlashCommand,
    Gapcursor,
    Dropcursor.configure({
      color: "#da5a4c",
      class: "drop-cursor",
    }),
    TableKit.configure({
      table: { resizable: true },
    }),
    Placeholder.configure({
      placeholder: ({ node }: any) => {
        switch (node.type.name) {
          case "title":
            return "Untitled";
          case "heading":
            return "Heading";
          case "codeBlock":
            return "Write code ...";
          default:
            return "Write something… or type '/'";
        }
      },
      showOnlyCurrent: false,
      includeChildren: true,
    }),
  ];

  if (ydoc) {
    extensions.push(
      Collaboration.configure({
        document: ydoc,
      })
    );
  }

  if (awareness && user) {
    extensions.push(
      CustomCursor.configure({
        awareness,
        user,
      })
    );
  }

  return extensions;
};
