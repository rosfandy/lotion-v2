"use client";

import { useEffect } from "react";
import { WorkspaceList } from "@/features/workspace/components/WorkspaceList";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useAuth } from "@/features/auth/hook";
import { redirect, useRouter } from "next/navigation";

const DashboardPage = () => {
  const { getToken } = useAuth();
  const { setItems } = useBreadcrumb();
  const isAuthenticated = getToken();

  useEffect(() => {
    setItems([{ label: 'Dashboard' }]);
  }, [setItems]);

  if (!isAuthenticated) {
    redirect('/auth/login');
  }

  return (
    <div className="mx-auto max-w-5xl px-8">
      <WorkspaceList />
    </div>
  );
};

export default DashboardPage;
