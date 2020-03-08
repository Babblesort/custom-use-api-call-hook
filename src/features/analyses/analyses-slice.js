import { createSlice } from '@reduxjs/toolkit';
import {
  addItemToArray,
  removeItemById,
  updateItemInArray
} from '../../redux/state-array-fns';

// Note that reduxToolkit createSlice wraps reducer methods in immer.js produce
// allowing the reducer methods to be written as state mutations but under the
// hood returning new immutable state objects.

const analysesSlice = createSlice({
  name: 'analyses',
  initialState: [],
  reducers: {
    addAnalysis: (state, action) => addItemToArray(state, action),
    removeAnalysis: (state, action) => removeItemById(state, action),
    updateAnalysis: (state, action) => updateItemInArray(state, action)
  }
});

export const {
  addAnalysis,
  removeAnalysis,
  updateAnalysis
} = analysesSlice.actions;

export default analysesSlice.reducer;
