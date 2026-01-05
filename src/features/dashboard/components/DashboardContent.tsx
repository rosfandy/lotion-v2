"use client";

import { HiOutlinePhoto } from "react-icons/hi2";

interface DashboardContentProps {
  title?: string;
  lastEdited?: string;
  author?: {
    name: string;
    avatar: string;
  };
  tags?: Array<{
    label: string;
    color: string;
  }>;
  coverImage?: string;
  children?: React.ReactNode;
}

export const DashboardContent = ({
  title = "Q4 Product Strategy",
  lastEdited = "Oct 24, 2023",
  author = {
    name: "Alex",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnNWIFtJ7CQ6Qv50R6-fXbzZoUaRPrK9IJhWH9MGQDj697ajX2a1yl1MDiCiSbfBf9PwbTBKIYh_st3dWaHbNAei1IhSTxGjJZbrLCplkCd99yTiLx1eSdQPJ8OgScPUfVAfeU19yFmLpbnFEEIaUPam-rWhEgg3p3tNHkrY6lVqVZ21lTts4-Ds5gSFJlDNDHyU0eFkKYwijzODW0NNLhlq9d1HjK0zpMzUDoK70EAUxhUMijH5ufh7zH0o46FZPxzYeqdFF_HJHj",
  },
  tags = [
    { label: "Planning", color: "orange" },
    { label: "Q4", color: "blue" },
  ],
  coverImage = "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  children,
}: DashboardContentProps) => {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark relative transition-colors duration-200">
      {/* Cover Image */}
      <div className="h-[20vh] min-h-[160px] w-full bg-slate-100 dark:bg-[#151515] relative group">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 dark:opacity-80 transition-opacity duration-300"
          style={{ backgroundImage: `url("${coverImage}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/60 dark:to-transparent"></div>
        <button className="absolute bottom-2 right-4 bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 text-slate-600 dark:text-white text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 backdrop-blur-sm border border-transparent dark:border-white/10">
          <HiOutlinePhoto size={14} /> Change cover
        </button>
      </div>

      {/* Content */}
      <div className="max-w-[850px] mx-auto px-6 md:px-20 pb-40 relative z-10">
        {/* Page Icon */}
        <div className="-mt-[44px] mb-4 group relative inline-block">
          <div className="size-[88px] flex items-center justify-center text-[70px] leading-none transition-transform hover:scale-105 cursor-pointer select-none">
            🚀
          </div>
        </div>

        {/* Title */}
        <div className="group mb-2">
          <input
            className="w-full bg-transparent border-none text-[40px] font-bold text-slate-900 dark:text-[#ffffff] placeholder:text-slate-300 dark:placeholder:text-[#3f3f3f] focus:ring-0 p-0 leading-tight tracking-tight outline-none"
            placeholder="Untitled"
            type="text"
            value={title}
          />
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-[#888] mb-8 pb-4 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3">
            <div className="w-24 text-slate-400 dark:text-[#666] flex items-center gap-1.5 text-xs">
              Created by
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-[#d4d4d4] text-xs font-medium">
              <div
                className="size-4 rounded-full bg-center bg-cover"
                style={{ backgroundImage: `url("${author.avatar}")` }}
              ></div>
              {author.name}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 text-slate-400 dark:text-[#666] flex items-center gap-1.5 text-xs">
              Date
            </div>
            <div className="text-slate-700 dark:text-[#d4d4d4] text-xs">{lastEdited}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 text-slate-400 dark:text-[#666] flex items-center gap-1.5 text-xs">
              Tags
            </div>
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`bg-${tag.color}-100 dark:bg-${tag.color}-500/20 text-${tag.color}-700 dark:text-${tag.color}-200 px-1.5 py-0.5 rounded text-xs font-medium`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex flex-col gap-1 text-[16px] leading-7">
          {children}
        </div>
      </div>
    </main>
  );
};