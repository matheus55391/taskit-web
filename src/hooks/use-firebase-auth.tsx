
import { useEffect, useState } from 'react';
import { User as FirebaseUser, getIdToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface FirebaseUserStatus {
  isAuthenticated: boolean;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  token: string | null;
}

export const useFirebaseAuth = (): FirebaseUserStatus => {
  const [state, setState] = useState<FirebaseUserStatus>({
    isAuthenticated: false,
    firebaseUser: null,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      const token = firebaseUser ? await getIdToken(firebaseUser) : null;
      setState({
        isAuthenticated: !!firebaseUser,
        firebaseUser: firebaseUser,
        isLoading: false,
        token,
      });
    });

    return () => unsubscribe();
  }, []);

  return state;
};