import { DashboardHeader, DashboardSidebar } from "@/features/dashboard/components";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <BreadcrumbProvider>
            <div className="flex">
                <div className="fixed w-[240px] z-50 h-screen">
                    <DashboardSidebar />
                </div>
                <div className="md:ml-[240px] w-full">
                    <DashboardHeader />
                    {children}
                </div>
            </div>
        </BreadcrumbProvider>
    )
}

export default DashboardLayout