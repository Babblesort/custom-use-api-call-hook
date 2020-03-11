import { createSlice } from '@reduxjs/toolkit';

const genericApiCallSlice = createSlice({
  name: 'apiCall',
  reducers: {
    callBegan: () => ({ isProcessing: true, hasError: false }),
    callSuccess: () => ({ isProcessing: false, hasError: false }),
    callFailed: () => ({ isProcessing: false, hasError: true })
  }
});

export const {
  callBegan,
  callSuccess,
  callFailed
} = genericApiCallSlice.actions;

export const initialState = { isProcessing: false, hasError: false };

export default genericApiCallSlice.reducer;
