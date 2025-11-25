import { create } from "zustand";

export const useCourseStore = create((set) => ({
  isOpen: false,
  drawerName: "",
  data: {},
  openCourseDrawer: (new_data) =>
    set((state) => ({
      isOpen: true,
      drawerName: new_data.drawerName,
      data: { ...state.data, ...new_data },
    })),
  closeCourseDrawer: () => set({ isOpen: false }),
  updateData: (new_data) =>
    set((state) => ({ data: { ...state.data, ...new_data } })),
}));
