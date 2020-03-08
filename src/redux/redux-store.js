import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import insightsReducer from '../features/insights/insights-slice';
import analysesReducer from '../features/analyses/analyses-slice';
import hypothesesReducer from '../features/hypotheses/hypotheses-slice';
import projectReducer from '../features/project/project-slice';

const collectionsReducer = combineReducers({
  insights: insightsReducer,
  analyses: analysesReducer,
  hypotheses: hypothesesReducer
});

const rootReducer = combineReducers({
  project: combineReducers({
    details: projectReducer,
    collections: collectionsReducer
  })
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});
