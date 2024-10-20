import { create } from 'zustand'

export const usePeriodStore = create((set) => ({
  periodId: null,
  setPeriodId: (id) => set({ periodId: id }),
}))

export default usePeriodStore
