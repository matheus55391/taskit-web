"use client";
// hooks/useGoogleAuth.ts

import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState, useCallback } from "react";

interface UseGoogleAuthReturn {
    signInWithGoogle: () => Promise<void>;
    signUpWithGooglePopup: () => Promise<void>;
    error: string | null;
}

const useGoogleAuth = (): UseGoogleAuthReturn => {
    const [error, setError] = useState<string | null>(null);

    const signInWithGoogle = useCallback(async () => {
        try {
            await signInWithPopup(auth, googleProvider);

        } catch (err) {
            const errorMessage = (err as Error).message;
            setError(errorMessage);
            console.error("Erro ao realizar o login: ", errorMessage);
        }
    }, []);

    const signUpWithGooglePopup = useCallback(async () => {
        try {
            await signInWithPopup(auth, googleProvider);

        } catch (err) {
            const errorMessage = (err as Error).message;
            setError(errorMessage);
            console.error("Erro ao realizar o login: ", errorMessage);
        }
    }, []);

    return { signInWithGoogle, signUpWithGooglePopup, error };
};

export default useGoogleAuth;
