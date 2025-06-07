"use client";

import { useSessionStore } from "@/stores/session-store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { SplashScreen } from "../splash-screen";

export interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated, isLoading } = useFirebaseAuth();
    const { state: { profile } } = useSessionStore();

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated) {
            router.push("/");
        }
        
    }, [isLoading, isAuthenticated, pathname, profile, router]);

    return isAuthenticated && !isLoading ? <React.Fragment>{children}</React.Fragment> : <SplashScreen />;
};


