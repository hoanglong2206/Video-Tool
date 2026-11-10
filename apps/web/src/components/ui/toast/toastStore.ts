import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newToast: ToastItem = { ...toast, id, duration: toast.duration ?? 4000 };

    set((state) => ({
      toasts: [...state.toasts.slice(-4), newToast], // Keep at most 5 toasts
    }));

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, newToast.duration);
    }

    return id;
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

export const toast = {
  success: (message: string, title?: string, duration?: number): string =>
    useToastStore.getState().addToast({ type: "success", message, title, duration }),
  error: (message: string, title?: string, duration?: number): string =>
    useToastStore.getState().addToast({ type: "error", message, title, duration: duration ?? 5000 }),
  info: (message: string, title?: string, duration?: number): string =>
    useToastStore.getState().addToast({ type: "info", message, title, duration }),
  warning: (message: string, title?: string, duration?: number): string =>
    useToastStore.getState().addToast({ type: "warning", message, title, duration }),
  dismiss: (id: string): void => useToastStore.getState().removeToast(id),
};

