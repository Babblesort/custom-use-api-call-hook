import { useEffect, useReducer } from 'react';
import { createSlice } from '@reduxjs/toolkit';

const apiCallSlice = createSlice({
  name: 'apiCall',
  reducers: {
    callBegan: state => ({ ...state, isProcessing: true, hasError: false }),
    callSuccess: (state, action) => ({
      ...state,
      isProcessing: false,
      hasError: false,
      data: action.payload
    }),
    callFailed: state => ({ ...state, isProcessing: false, hasError: true })
  }
});

const useApiServiceCallLocal = (
  apiServiceCall,
  initialData,
  processTrigger
) => {
  const initialState = {
    isProcessing: false,
    hasError: false,
    data: initialData
  };
  const [state, dispatch] = useReducer(apiCallSlice.reducer, initialState);
  const { callBegan, callSuccess, callFailed } = apiCallSlice.actions;

  useEffect(() => {
    let hostIsMounted = true;

    const dispatchIfMounted = action => {
      if (hostIsMounted) {
        dispatch(action);
      }
    };

    const processApiCall = async () => {
      dispatch(callBegan());

      try {
        const result = await apiServiceCall();

        dispatchIfMounted(callSuccess(result));
      } catch (error) {
        dispatchIfMounted(callFailed());
      }
    };

    processApiCall();

    return () => {
      hostIsMounted = false;
    };
  }, [apiServiceCall, callFailed, callSuccess, callBegan]);

  return state;
};

export default useApiServiceCallLocal;
