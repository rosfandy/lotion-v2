"use client";

import { useRouter } from "next/navigation";
import { ThemeSwitch } from "@/components/fragments/ThemeSwitch";
import { SignupForm } from "@/features/auth/components";

export default function SignupPage() {
    const router = useRouter();

    const handleSignupSuccess = () => {
        router.push("/auth/login");
    };

    const handleSignupError = (error: string) => {
        console.error("Signup error:", error);
    };

    return (
        <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-[#d4d4d4] font-display antialiased transition-colors duration-200">
            {/* Radial gradient background */}
            <div className="fixed inset-0 z-10 top-0 radial-bg"></div>
            <main className="relative flex min-h-screen items-center justify-center py-16 px-4 z-20">
                <div className="w-full max-w-md">
                    <SignupForm
                        onSuccess={handleSignupSuccess}
                        onError={handleSignupError}
                    />
                </div>
            </main>
            <ThemeSwitch />
        </div>
    );
}