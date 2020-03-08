import { createSlice } from '@reduxjs/toolkit';
import {
  addItemToArray,
  removeItemById,
  updateItemInArray
} from '../../redux/state-array-fns';

// Note that Redux Toolkit createSlice wraps reducer methods in immer.js produce
// allowing the reducer methods to be written as state mutations but under the
// hood returning new immutable state objects.

const insightsSlice = createSlice({
  name: 'insights',
  initialState: [],
  reducers: {
    setInsights: (_, action) => action.payload,
    addInsight: (state, action) => addItemToArray(state, action),
    removeInsight: (state, action) => removeItemById(state, action),
    updateInsight: (state, action) => updateItemInArray(state, action)
  }
});

export const {
  setInsights,
  addInsight,
  removeInsight,
  updateInsight
} = insightsSlice.actions;

export default insightsSlice.reducer;
