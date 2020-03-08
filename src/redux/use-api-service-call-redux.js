import { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const apiCallSlice = createSlice({
  name: 'apiCall',
  reducers: {
    callBegan: state => ({ ...state, isProcessing: true, hasError: false }),
    callSuccess: state => ({ ...state, isProcessing: false, hasError: false }),
    callFailed: state => ({ ...state, isProcessing: false, hasError: true })
  }
});

const useApiServiceCallRedux = (
  apiServiceCall,
  onSuccessActionCreator,
  onErrorActionCreator,
  processTrigger
) => {
  const globalDispatch = useDispatch();
  const initialState = { isProcessing: false, hasError: false };
  const [state, localDispatch] = useReducer(apiCallSlice.reducer, initialState);
  const { callBegan, callSuccess, callFailed } = apiCallSlice.actions;

  useEffect(() => {
    let hostIsMounted = true;

    const dispatchIfMounted = action => {
      if (hostIsMounted) {
        localDispatch(action);
      }
    };

    const processApiCall = async () => {
      localDispatch(callBegan());

      try {
        const result = await apiServiceCall();

        dispatchIfMounted(callSuccess());
        if (onSuccessActionCreator) {
          globalDispatch(onSuccessActionCreator(result));
        }
      } catch (error) {
        dispatchIfMounted(callFailed);
        if (onErrorActionCreator) {
          globalDispatch(onErrorActionCreator(error));
        }
      }
    };

    processApiCall();

    return () => {
      hostIsMounted = false;
    };
  }, [
    apiServiceCall,
    onSuccessActionCreator,
    onErrorActionCreator,
    processTrigger,
    globalDispatch,
    callBegan,
    callSuccess,
    callFailed
  ]);

  return state;
};

export default useApiServiceCallRedux;
