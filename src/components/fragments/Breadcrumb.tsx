import { HiOutlineFolderOpen } from "react-icons/hi2";
import { ReactNode } from "react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    icon?: ReactNode;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-text-muted-dark whitespace-nowrap overflow-hidden text-ellipsis">
            <HiOutlineFolderOpen size={18} className="mr-1" />
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    {index > 0 && (
                        <span className="text-slate-300 dark:text-[#444] text-xs">/</span>
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="flex items-center gap-1 hover:text-slate-800 dark:hover:text-[#ebebeb] cursor-pointer transition-colors hover:underline decoration-slate-300 underline-offset-2">
                            {item.icon}
                            <span className="hidden sm:inline">{item.label}</span>
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1 font-medium text-slate-800 dark:text-[#ebebeb]">
                            {item.icon}
                            <span className="hidden sm:inline">{item.label}</span>
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};