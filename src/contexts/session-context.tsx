"use client";

import { SplashScreen } from "@/components/splash-screen";
import { useGetProfileQuery } from "@/queries/get-profile-query";
import React, { ReactNode } from "react";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const { isLoading } = useGetProfileQuery();

    if (isLoading) {
        return <SplashScreen />;
    }

    return <React.Fragment>{children}</React.Fragment>;
};