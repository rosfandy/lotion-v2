"use client";

import { ThemeSwitch } from "@/components/fragments/ThemeSwitch";
import { Breadcrumb } from "@/components/fragments/Breadcrumb";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import {
  HiOutlineBars3,
  HiOutlineStar,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  onShareClick?: () => void;
  onStarClick?: () => void;
  onMoreClick?: () => void;
}

export const DashboardHeader = ({
  onMenuClick,
  onShareClick,
  onStarClick,
  onMoreClick,
}: DashboardHeaderProps) => {
  const { items } = useBreadcrumb();

  return (
    <header className="h-11 flex items-center justify-between px-3 sticky top-0 bg-background-light dark:bg-background-dark z-50 transition-colors duration-200">
      <div className="flex items-center gap-2 overflow-hidden">
        <button
          className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-hover-dark"
          onClick={onMenuClick}
        >
          <HiOutlineBars3 className="text-slate-500 dark:text-text-muted-dark" />
        </button>
        <Breadcrumb items={items} />
      </div>

      <div className="flex items-center gap-1 sm:gap-2 relative z-10">
        <span className="text-xs text-slate-400 dark:text-[#666] hidden lg:block mr-2">
          Edited 10m ago
        </span>
        <button
          className="text-slate-500 dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-hover-dark px-3 py-2 rounded transition-colors text-sm font-medium "
          onClick={onShareClick}
        >
          Share
        </button>
        <button
          className="flex items-center justify-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-hover-dark text-slate-500 dark:text-text-muted-dark transition-colors min-w-[44px]"
          onClick={onStarClick}
        >
          <HiOutlineStar size={16} />
        </button>
        <button
          className="flex items-center justify-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-hover-dark text-slate-500 dark:text-text-muted-dark transition-colors min-w-[44px]"
          onClick={onMoreClick}
        >
          <HiOutlineEllipsisHorizontal size={20} />
        </button>
        <div className="w-px h-4 bg-gray-200 dark:bg-[#333] mx-1"></div>
        <ThemeSwitch />
        <div
          className="ml-1 bg-center bg-no-repeat bg-cover rounded-full size-7 ring-1 ring-gray-200 dark:ring-[#333] cursor-pointer"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnNWIFtJ7CQ6Qv50R6-fXbzZoUaRPrK9IJhWH9MGQDj697ajX2a1yl1MDiCiSbfBf9PwbTBKIYh_st3dWaHbNAei1IhSTxGjJZbrLCplkCd99yTiLx1eSdQPJ8OgScPUfVAfeU19yFmLpbnFEEIaUPam-rWhEgg3p3tNHkrY6lVqVZ21lTts4-Ds5gSFJlDNDHyU0eFkKYwijzODW0NNLhlq9d1HjK0zpMzUDoK70EAUxhUMijH5ufh7zH0o46FZPxzYeqdFF_HJHj")`
          }}
        ></div>
      </div>
    </header>
  );
};