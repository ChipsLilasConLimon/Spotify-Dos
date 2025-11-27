import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) =>({
        token: null,
        username: null,
        password: null,

        loginStorage: (token: string, username: string, password: string) => set({token, username, password}),
        logoutStorge: () => set({token: null, username: null, password: null})
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
)
);