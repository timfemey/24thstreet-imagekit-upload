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

interface addFileId {
  file: string;
  setId: (a: string) => void;
  removeId: () => void;
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

const useFileId = create<addFileId>((set) => ({
  file: "",
  setId: (a) => set({ file: a }),
  removeId: () => set({ file: "" }),
}));

export { useBearStore, useShowDeleteModal, useFileId };
