"use client";
// hooks/useEmailPasswordLogin.ts

import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useCallback } from "react";

interface UseEmailPasswordLoginReturn {
    loginWithEmailPassword: (email: string, password: string) => Promise<void>;
    isPending: boolean;
    error: string | null;
}

const useEmailPasswordLogin = (): UseEmailPasswordLoginReturn => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loginWithEmailPassword = useCallback(
        async (email: string, password: string) => {
            setIsPending(true);
            setError(null); // Resetar o erro antes de tentar o login.

            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (err) {
                if (err instanceof FirebaseError) {
                    // Use o código do erro para mensagens mais detalhadas.
                    switch (err.code) {
                        case "auth/invalid-email":
                            setError("O e-mail fornecido é inválido.");
                            break;
                        case "auth/user-disabled":
                            setError("O usuário foi desativado.");
                            break;
                        case "auth/user-not-found":
                            setError("Usuário não encontrado.");
                            break;
                        case "auth/wrong-password":
                            setError("A senha está incorreta.");
                            break;
                        case "auth/invalid-credential":
                            setError("Credenciais inválidas.");
                            break;
                        default:
                            setError("Ocorreu um erro inesperado. Tente novamente.");
                    }
                } else {
                    // Caso seja outro tipo de erro, trate genericamente.
                    setError("Ocorreu um erro desconhecido.");
                }
            } finally {
                setIsPending(false); // Finaliza o estado de pendência.
            }
        },
        []
    );

    return { loginWithEmailPassword, isPending, error };
};

export default useEmailPasswordLogin;

