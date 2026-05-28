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
  autoRefreshToken: () => void;
}

let refreshInterval: NodeJS.Timeout | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => {
        set({ user });
        if (user) {
          get().autoRefreshToken();
        } else {
          if (refreshInterval) clearInterval(refreshInterval);
        }
      },
      logout: async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
          set({ user: null });
          if (refreshInterval) clearInterval(refreshInterval);
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      checkSession: async () => {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          if (data.user) {
            set({ user: data.user });
            get().autoRefreshToken();
          } else {
            // Try to refresh once if checkSession fails
            const refreshRes = await fetch("/api/auth/refresh", {
              method: "POST",
            });
            const refreshData = await refreshRes.json();
            if (refreshData.user) {
              set({ user: refreshData.user });
              get().autoRefreshToken();
            } else {
              set({ user: null });
            }
          }
        } catch (_error) {
          set({ user: null });
        }
      },
      autoRefreshToken: () => {
        if (refreshInterval) clearInterval(refreshInterval);

        // Refresh every 25 minutes (session is 30 mins)
        refreshInterval = setInterval(
          async () => {
            try {
              const res = await fetch("/api/auth/refresh", { method: "POST" });
              const data = await res.json();
              if (!data.user) {
                set({ user: null });
                if (refreshInterval) clearInterval(refreshInterval);
              }
            } catch (error) {
              console.error("Token refresh failed:", error);
              set({ user: null });
              if (refreshInterval) clearInterval(refreshInterval);
            }
          },
          1000 * 60 * 25,
        );
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
