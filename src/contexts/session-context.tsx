"use client";

import { useGetProfileQuery } from "@/queries/get-profile-query";
// import { SplashScreen } from "@/components/splash-screen";
import React, { ReactNode } from "react";

export const SplashScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Loading...</h1>
        </div>
    );
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const { isLoading } = useGetProfileQuery();

    if (isLoading) {
        return <SplashScreen />;
    }

    return <React.Fragment>{children}</React.Fragment>;
};