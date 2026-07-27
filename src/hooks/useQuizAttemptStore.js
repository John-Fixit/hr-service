import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useQuizAttemptStore = create(
  persist(
    (set, get) => ({
      activeAttemptKey: null,
      attempts: {},
      upsertAttempt: (attemptKey, payload) =>
        set((state) => ({
          activeAttemptKey: attemptKey,
          attempts: {
            ...state.attempts,
            [attemptKey]: {
              ...(state.attempts?.[attemptKey] || {}),
              ...payload,
            },
          },
        })),
      clearAttempt: (attemptKey) =>
        set((state) => {
          const nextAttempts = { ...state.attempts };
          delete nextAttempts[attemptKey];
          const hasActive = state.activeAttemptKey === attemptKey;
          return {
            attempts: nextAttempts,
            activeAttemptKey: hasActive ? null : state.activeAttemptKey,
          };
        }),
      getActiveAttempt: () => {
        const key = get().activeAttemptKey;
        if (!key) return null;
        return get().attempts?.[key] || null;
      },
    }),
    {
      name: "lms-quiz-attempts-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useQuizAttemptStore;
