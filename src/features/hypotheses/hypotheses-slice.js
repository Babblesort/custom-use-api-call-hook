import { createSlice } from '@reduxjs/toolkit';
import {
  addItemToArray,
  removeItemById,
  updateItemInArray
} from '../../redux/state-array-fns';

// Note that reduxToolkit createSlice wraps reducer methods in immer.js produce
// allowing the reducer methods to be written as state mutations but under the
// hood returning new immutable state objects.

const hypothesesSlice = createSlice({
  name: 'hypotheses',
  initialState: [],
  reducers: {
    addHypothesis: (state, action) => addItemToArray(state, action),
    removeHypothesis: (state, action) => removeItemById(state, action),
    updateHypothesis: (state, action) => updateItemInArray(state, action)
  }
});

export const {
  addHypothesis,
  removeHypothesis,
  updateHypothesis
} = hypothesesSlice.actions;

export default hypothesesSlice.reducer;
