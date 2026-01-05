import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/Button";

const heroVariants = cva(
  "relative overflow-hidden transition-colors duration-200",
  {
    variants: {
      size: {
        default: "pt-16 pb-20 lg:pt-24 lg:pb-32",
        large: "pt-24 pb-32 lg:pt-32 lg:pb-48",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const heroTitleVariants = cva(
  "font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight",
  {
    variants: {
      size: {
        default: "text-4xl md:text-6xl",
        large: "text-5xl md:text-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface HeroSectionProps extends VariantProps<typeof heroVariants> {
  className?: string;
}

export const HeroSection = ({ size, className }: HeroSectionProps) => {
  return (
    <div className={twMerge(heroVariants({ size, className }))}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-background-light to-background-light dark:from-[#252525] dark:via-background-dark dark:to-background-dark -z-10 transition-colors duration-200"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className={twMerge(heroTitleVariants({ size }))}>
          Your Hub for <br className="hidden md:block" />
          <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Collaborative Creativity
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-[#888] leading-relaxed">
          Lotion brings your wikis, docs, and projects into one unified
          workspace. Focus on your best work in a distraction-free environment.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </div>

        {/* Demo Screenshot */}
        <div className="mt-16 relative mx-auto w-full max-w-5xl">
          <div className="relative rounded-xl bg-white dark:bg-[#202020] border border-border-light dark:border-border-dark shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9] flex flex-col group transition-colors duration-200">
            {/* Browser Header */}
            <div className="h-10 bg-slate-50 dark:bg-[#252525] border-b border-border-light dark:border-border-dark flex items-center px-4 gap-2 transition-colors duration-200">
              <div className="size-3 rounded-full bg-red-400/80"></div>
              <div className="size-3 rounded-full bg-amber-400/80"></div>
              <div className="size-3 rounded-full bg-green-400/80"></div>
              <div className="ml-4 flex-1 max-w-md h-6 bg-slate-200 dark:bg-[#1a1a1a] rounded text-[10px] flex items-center px-3 text-slate-400 dark:text-zinc-600 font-mono transition-colors duration-200">
                lotion.app/workspace/product-roadmap
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 bg-sidebar-light dark:bg-[#1a1a1a] border-r border-border-light dark:border-border-dark p-4 hidden md:flex flex-col gap-4 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-6 rounded bg-slate-200 dark:bg-[#333]"></div>
                  <div className="h-3 w-24 bg-slate-200 dark:bg-[#333] rounded"></div>
                </div>
                <div className="space-y-3 opacity-60">
                  <div className="h-2 w-full bg-slate-300 dark:bg-[#333] rounded"></div>
                  <div className="h-2 w-3/4 bg-slate-300 dark:bg-[#333] rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-300 dark:bg-[#333] rounded"></div>
                </div>
                <div className="space-y-3 opacity-60 mt-4">
                  <div className="h-2 w-2/3 bg-slate-300 dark:bg-[#333] rounded"></div>
                  <div className="h-2 w-4/5 bg-slate-300 dark:bg-[#333] rounded"></div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-white dark:bg-[#191919] p-8 md:p-12 overflow-y-auto relative transition-colors duration-200">
                <div className="max-w-3xl mx-auto space-y-8">
                   <div className="w-full h-32 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-dashed border-primary/20 flex items-center justify-center text-primary/40 text-sm">
                     <span className="mr-2">🖼</span> Add Cover
                   </div>
                  <div className="space-y-2">
                    <div className="h-10 w-3/4 bg-slate-100 dark:bg-[#2a2a2a] rounded-lg"></div>
                    <div className="flex gap-3">
                      <div className="h-5 w-24 bg-slate-100 dark:bg-[#2a2a2a] rounded"></div>
                      <div className="h-5 w-32 bg-slate-100 dark:bg-[#2a2a2a] rounded"></div>
                    </div>
                  </div>
                  <div className="h-px w-full bg-border-light dark:bg-border-dark my-6"></div>
                  <div className="space-y-4">
                    <div className="h-3 w-full bg-slate-100 dark:bg-[#252525] rounded"></div>
                    <div className="h-3 w-11/12 bg-slate-100 dark:bg-[#252525] rounded"></div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-[#252525] rounded"></div>
                    <div className="flex gap-4 mt-6">
                      <div className="flex-1 h-32 bg-slate-50 dark:bg-[#202020] rounded-lg border border-border-light dark:border-border-dark p-4">
                        <div className="size-8 bg-slate-200 dark:bg-[#333] rounded-full mb-3"></div>
                        <div className="h-2 w-2/3 bg-slate-200 dark:bg-[#333] rounded mb-2"></div>
                        <div className="h-2 w-1/2 bg-slate-200 dark:bg-[#333] rounded"></div>
                      </div>
                      <div className="flex-1 h-32 bg-slate-50 dark:bg-[#202020] rounded-lg border border-border-light dark:border-border-dark p-4">
                        <div className="size-8 bg-slate-200 dark:bg-[#333] rounded-full mb-3"></div>
                        <div className="h-2 w-2/3 bg-slate-200 dark:bg-[#333] rounded mb-2"></div>
                        <div className="h-2 w-1/2 bg-slate-200 dark:bg-[#333] rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-[3rem]"></div>
        </div>
      </div>
    </div>
  );
};
