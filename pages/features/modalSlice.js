import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalStatus: false,
  },

  reducers: {
    openModal: (state) => {
      state.modalStatus = true;
    },
    closeModal: (state) => {
      state.modalStatus = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalStatus = (state) => state.modal.modalStatus;

export default modalSlice.reducer;
