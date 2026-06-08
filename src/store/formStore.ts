import { create } from "zustand";
import type { FormValues } from "../validation/formSchema";

type FormState = {
  history: FormValues[];
  addToHistory: (data: FormValues) => void;
}

export const useFormStore = create<FormState>((set) => ({
  history: [],

  addToHistory: (data) =>
    set((state) => ({
      history: [...state.history, data],
    })),
}));