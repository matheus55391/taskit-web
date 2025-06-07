"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { SplashScreen } from "../splash-screen";

interface GuestGuardProps {
    children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useFirebaseAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/app");
        }
    }, [isAuthenticated, router]);

    if (isLoading || isAuthenticated) return <SplashScreen />;

    return <React.Fragment>{children}</React.Fragment>;
};

