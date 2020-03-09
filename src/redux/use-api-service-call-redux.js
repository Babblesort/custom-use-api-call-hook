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
  const [apiCallState, localDispatch] = useReducer(
    apiCallSlice.reducer,
    initialState
  );
  const { callBegan, callSuccess, callFailed } = apiCallSlice.actions;

  useEffect(() => {
    let hostIsMounted = true;
    const safeDispatch = action => hostIsMounted && localDispatch(action);

    const processApiCall = async () => {
      localDispatch(callBegan());
      try {
        const result = await apiServiceCall();
        safeDispatch(callSuccess());
        onSuccessActionCreator &&
          globalDispatch(onSuccessActionCreator(result));
      } catch (error) {
        safeDispatch(callFailed);
        onErrorActionCreator && globalDispatch(onErrorActionCreator(error));
      }
    };

    processApiCall();

    return () => (hostIsMounted = false);
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

  return apiCallState;
};

export default useApiServiceCallRedux;
