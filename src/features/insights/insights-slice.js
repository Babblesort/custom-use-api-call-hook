import { createSlice } from '@reduxjs/toolkit';
import {
  addItemToArray,
  removeItemById,
  updateItemInArray
} from '../../redux/state-array-fns';

// Note that reduxToolkit createSlice wraps reducer methods in immer.js produce
// allowing the reducer methods to be written as state mutations but under the
// hood returning new immutable state objects.

const insightsSlice = createSlice({
  name: 'insights',
  initialState: [],
  reducers: {
    addInsight: (state, action) => addItemToArray(state, action),
    removeInsight: (state, action) => removeItemById(state, action),
    updateInsight: (state, action) => updateItemInArray(state, action)
  }
});

export const {
  addInsight,
  removeInsight,
  updateInsight
} = insightsSlice.actions;

export default insightsSlice.reducer;
