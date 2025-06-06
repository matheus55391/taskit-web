import { create } from "zustand";

export interface Profile {
  id: string;
  name: string;
  email: string;
}

export interface SessionState {
  profile: Profile | null;
}

interface SessionStoreState {
  state: SessionState;
  updateProfile: (newProfile: Profile | null) => void;
}

export const useSessionStore = create<SessionStoreState>((set) => ({
  state: { profile: null },
  updateProfile: (newProfile: Profile | null) => set({ state: { profile: newProfile } }),
}));


