import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import insightsReducer from '../features/insights/insights-slice';

const rootReducer = combineReducers({
  insights: insightsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});
