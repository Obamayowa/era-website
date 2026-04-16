import { create } from 'zustand'

interface NewsletterState {
  email: string
  status: 'idle' | 'loading' | 'success' | 'error'
  subscriberCount: number
  setEmail: (email: string) => void
  subscribe: (email: string) => Promise<void>
  reset: () => void
}

export const useNewsletterStore = create<NewsletterState>((set) => ({
  email: '',
  status: 'idle',
  subscriberCount: 2847,
  setEmail: (email) => set({ email }),
  subscribe: async (email) => {
    set({ status: 'loading' })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      if (email) {
        set((state) => ({
          status: 'success',
          email: '',
          subscriberCount: state.subscriberCount + 1,
        }))
      }
    } catch {
      set({ status: 'error' })
    }
  },
  reset: () => set({ status: 'idle', email: '' }),
}))
