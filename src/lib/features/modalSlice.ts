import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  toggleModal: boolean;
}

const initialState: InitialState = {
  toggleModal: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleToggleModal: (state, action: PayloadAction<boolean>) => {
      state.toggleModal = action.payload;
    }
  },
})

export const { handleToggleModal } = modalSlice.actions;
export default modalSlice.reducer;

