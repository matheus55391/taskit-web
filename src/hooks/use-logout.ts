// hooks/useLogout.ts

import { auth } from "@/lib/firebase";
import { useSessionStore } from "@/stores/session-store";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useState } from "react";

interface UseLogoutReturn {
    handleLogout: () => Promise<void>;
    error: string | null;
    loading: boolean;
}

const useLogout = (): UseLogoutReturn => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const sessionStore = useSessionStore();
    const queryClient = useQueryClient();
    const handleLogout = async () => {
        setLoading(true);
        setError(null);

        try {
            queryClient.invalidateQueries();
            queryClient.clear();
            sessionStore.updateProfile(null);
            await signOut(auth);
        } catch (err) {
            const errorMessage = (err as Error).message;
            setError(errorMessage);
            console.error("Erro ao fazer logout: ", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { handleLogout, error, loading };
};

export default useLogout;
