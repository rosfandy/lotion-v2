"use client";

import {
  HiOutlineBars4,
  HiOutlinePlus,
  HiOutlineBold,
  HiOutlineItalic,
  HiOutlineUnderline,
  HiOutlineXMark,
  HiOutlineLink,
  HiOutlineSwatch,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

interface EditorBlockProps {
  type: "text" | "callout" | "heading" | "todo" | "divider";
  content?: string;
  children?: React.ReactNode;
  onAddBlock?: () => void;
  onEditBlock?: () => void;
  showToolbar?: boolean;
}

export const EditorBlock = ({
  type,
  content,
  children,
  onAddBlock,
  onEditBlock,
  showToolbar = false,
}: EditorBlockProps) => {
  const renderBlock = () => {
    switch (type) {
      case "text":
        return (
          <div className="group relative flex items-start -ml-8 pl-8 py-0.5 hover:bg-hover-light dark:hover:bg-[#1f1f1f]/50 rounded">
            <div className="absolute left-1 top-1 opacity-0 group-hover:opacity-100 cursor-pointer text-slate-300 dark:text-[#444] p-0.5 hover:bg-gray-200 dark:hover:bg-[#333] rounded transition-opacity">
              <HiOutlineBars4 size={18} />
            </div>
            <div className="absolute left-5 top-1 opacity-0 group-hover:opacity-100 cursor-pointer text-slate-300 dark:text-[#444] p-0.5 hover:bg-gray-200 dark:hover:bg-[#333] rounded transition-opacity">
              <HiOutlinePlus size={18} />
            </div>
            <p className="selection:bg-primary/30">{content}</p>
          </div>
        );

      case "callout":
        return (
          <div className="group relative flex items-start -ml-8 pl-8 py-2">
            <div className="absolute left-1 top-3 opacity-0 group-hover:opacity-100 cursor-pointer text-slate-300 dark:text-[#444] p-0.5 hover:bg-gray-200 dark:hover:bg-[#333] rounded transition-opacity">
              <HiOutlineBars4 size={18} />
            </div>
            <div className="flex w-full rounded-lg bg-gray-50 dark:bg-[#202020] border border-transparent dark:border-[#2f2f2f] p-4 gap-3">
              <div className="text-xl pt-0.5 select-none">💡</div>
              <div className="flex flex-col gap-1 w-full">
                <h4 className="text-[16px] font-semibold text-slate-900 dark:text-[#ffffff]">
                  Overview
                </h4>
                <p className="text-[15px] text-slate-600 dark:text-[#b0b0b0] leading-6">
                  {content}
                </p>
              </div>
            </div>
          </div>
        );

      case "heading":
        return (
          <div className="group relative flex items-start -ml-8 pl-8 mt-6 mb-2">
            <div className="absolute left-1 top-2.5 opacity-0 group-hover:opacity-100 cursor-pointer text-slate-300 dark:text-[#444] p-0.5 hover:bg-gray-200 dark:hover:bg-[#333] rounded transition-opacity">
              <HiOutlineBars4 size={18} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-[#ffffff] pb-1 border-b border-gray-100 dark:border-[#2f2f2f] w-full">
              {content}
            </h2>
          </div>
        );

      case "todo":
        return (
          <div className="group relative flex items-start -ml-8 pl-8 py-0.5">
            <div className="absolute left-1 top-1 opacity-0 group-hover:opacity-100 cursor-pointer text-slate-300 dark:text-[#444] p-0.5 hover:bg-gray-200 dark:hover:bg-[#333] rounded transition-opacity">
              <HiOutlineBars4 size={18} />
            </div>
            <label className="flex gap-x-3 items-start cursor-pointer w-full">
              <input
                checked
                className="mt-1.5 size-4 rounded border-slate-300 dark:border-[#555] bg-transparent text-blue-600 dark:text-blue-500 focus:ring-offset-0 focus:ring-0 cursor-pointer transition-all"
                type="checkbox"
              />
              <span className="text-slate-400 dark:text-[#666] line-through decoration-slate-400 dark:decoration-[#666]">
                {content}
              </span>
            </label>
            {showToolbar && (
              <div className="absolute top-8 left-40 bg-white dark:bg-[#1f1f1f] rounded shadow-menu dark:shadow-menu-dark ring-1 ring-black/5 dark:ring-white/10 flex items-center p-1 gap-0.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center border-r border-gray-200 dark:border-[#333] pr-1 mr-1">
                  <button className="flex items-center gap-1 p-1 hover:bg-gray-100 dark:hover:bg-[#333] rounded text-slate-600 dark:text-text-main-dark text-xs font-medium h-7">
                    Text
                    <HiOutlineBars4 size={16} className="rotate-90" />
                  </button>
                </div>
                <button className="size-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333] rounded text-slate-600 dark:text-text-main-dark hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineBold size={18} />
                </button>
                <button className="size-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333] rounded text-slate-600 dark:text-text-main-dark hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineItalic size={18} />
                </button>
                <button className="size-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333] rounded text-slate-600 dark:text-text-main-dark hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineUnderline size={18} />
                </button>
                <button className="size-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333] rounded text-slate-600 dark:text-text-main-dark hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <HiOutlineXMark size={18} />
                </button>
                <div className="w-px h-4 bg-gray-200 dark:bg-[#333] mx-0.5"></div>
                <button className="size-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333] rounded text-blue-600 dark:text-blue-400 transition-colors">
                  <HiOutlineLink size={18} />
                </button>
                <button className="size-7 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#333] rounded text-slate-600 dark:text-text-main-dark transition-colors">
                  <HiOutlineSwatch size={18} />
                </button>
              </div>
            )}
          </div>
        );

      case "divider":
        return (
          <div className="group relative flex items-center gap-2 -ml-8 pl-8 mt-2">
            <div className="absolute left-1 top-0.5 opacity-100 cursor-pointer text-slate-400 dark:text-[#666] p-0.5 hover:bg-gray-200 dark:hover:bg-[#333] rounded">
              <HiOutlinePlus size={20} />
            </div>
            <p className="text-slate-400 dark:text-[#555]">Type '/' for commands</p>
            <div className="absolute top-8 left-8 w-[280px] bg-white dark:bg-[#1f1f1f] rounded-lg shadow-menu dark:shadow-menu-dark ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-20 flex flex-col py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 dark:text-[#666] uppercase tracking-wider">
                Basic blocks
              </div>
              <button className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] transition-colors group/cmd text-left mx-1 rounded">
                <div className="size-11 bg-white dark:bg-[#2c2c2c] border border-gray-200 dark:border-[#3e3e3e] rounded flex items-center justify-center shadow-sm shrink-0">
                  <span className="text-xl text-slate-600 dark:text-text-main-dark font-serif">
                    T
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-slate-700 dark:text-[#ebebeb]">
                    Text
                  </span>
                  <span className="text-xs text-slate-400 dark:text-[#888] truncate">
                    Just start writing with plain text.
                  </span>
                </div>
              </button>
              <button className="flex items-center gap-3 px-3 py-1.5 bg-blue-50 dark:bg-[#135bec]/20 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] transition-colors group/cmd text-left mx-1 rounded">
                <div className="size-11 bg-white dark:bg-[#2c2c2c] border border-gray-200 dark:border-[#3e3e3e] rounded flex items-center justify-center shadow-sm shrink-0">
                  <HiOutlineCheckCircle className="text-slate-600 dark:text-text-main-dark" size={22} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    To-do list
                  </span>
                  <span className="text-xs text-slate-500 dark:text-[#aaa] truncate">
                    Track tasks with a to-do list.
                  </span>
                </div>
              </button>
              <button className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] transition-colors group/cmd text-left mx-1 rounded">
                <div className="size-11 bg-white dark:bg-[#2c2c2c] border border-gray-200 dark:border-[#3e3e3e] rounded flex items-center justify-center shadow-sm shrink-0">
                  <span className="text-2xl font-bold text-slate-600 dark:text-text-main-dark">
                    H1
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-slate-700 dark:text-[#ebebeb]">
                    Heading 1
                  </span>
                  <span className="text-xs text-slate-400 dark:text-[#888] truncate">
                    Big section heading.
                  </span>
                </div>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderBlock();
};