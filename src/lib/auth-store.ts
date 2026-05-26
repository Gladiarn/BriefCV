import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
          set({ user: null });
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      checkSession: async () => {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          set({ user: data.user });
        } catch (error) {
          set({ user: null });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
