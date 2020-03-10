import { createSlice } from '@reduxjs/toolkit';

const genericApiCallSlice = createSlice({
  name: 'apiCall',
  reducers: {
    callBegan: state => ({ isProcessing: true, hasError: false }),
    callSuccess: state => ({ isProcessing: false, hasError: false }),
    callFailed: state => ({ isProcessing: false, hasError: true })
  }
});

export const {
  callBegan,
  callSuccess,
  callFailed
} = genericApiCallSlice.actions;

export const initialState = { isProcessing: false, hasError: false };

export default genericApiCallSlice.reducer;
