// store/useProfileStore.ts
import { create } from 'zustand'

type Profile = {
  full_name: string
  role: string
  avatar_url?: string
}

type Store = {
  profile: Profile | null
  setProfile: (profile: Profile) => void
}

export const useProfileStore = create<Store>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))
