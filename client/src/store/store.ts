import create from "zustand";

interface BearState {
  uploadPage: boolean;
  setPage: () => void;
  removePage: () => void;
}

interface showDelModal {
  show: boolean;
  setConfirm: () => void;
  setUnConfirm: () => void;
}

const useBearStore = create<BearState>((set) => ({
  uploadPage: true,
  setPage: () => set({ uploadPage: false }),
  removePage: () => set({ uploadPage: true }),
}));

const useShowDeleteModal = create<showDelModal>((set) => ({
  show: false,
  setConfirm: () => set({ show: true }),
  setUnConfirm: () => set({ show: false }),
}));

export { useBearStore, useShowDeleteModal };
