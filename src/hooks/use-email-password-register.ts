"use client";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useCallback } from "react";

interface UseEmailPasswordRegisterProps {
    createUserWithEmailPassword: (
        email: string,
        password: string,
        displayName: string
    ) => Promise<void>;
    isPending: boolean;
    error: string | null;
}

const useEmailPasswordRegister = (): UseEmailPasswordRegisterProps => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const createUserWithEmailPassword = useCallback(
        async (email: string, password: string, displayName: string) => {
            setIsPending(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await updateProfile(userCredential.user, {
                    displayName,
                });
            } catch (err) {
                const errorMessage = (err as Error).message;
                setError(errorMessage);
                console.error("Erro ao criar o usu rio: ", errorMessage);
            } finally {
                setIsPending(false);
            }
        },
        []
    );

    return { createUserWithEmailPassword, isPending, error };
};

export default useEmailPasswordRegister;
