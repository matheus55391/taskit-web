"use client";

import { makeQueryClient } from "@/lib/queryClient";
import {
    QueryClient,
    QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import * as React from "react";

export interface TanstackQueryContextState {
    queryClient: QueryClient;
}

const QueryClientContext = React.createContext<
    TanstackQueryContextState | undefined
>(undefined);

interface TanstackQueryClientProviderProps {
    children: React.ReactNode;
}

export function TanstackQueryProvider({
    children,
}: TanstackQueryClientProviderProps): React.JSX.Element {

    const queryClient = makeQueryClient({});

    return (
        <QueryClientContext.Provider value={{ queryClient }}>
            <TanstackQueryClientProvider client={queryClient}>
                {children}
            </TanstackQueryClientProvider>
        </QueryClientContext.Provider>
    );
}