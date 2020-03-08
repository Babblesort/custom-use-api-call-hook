import { useEffect, useReducer } from 'react';

const apiCallReducer = (state, action) => {
  switch (action.type) {
    case 'CALL_BEGAN':
      return { ...state, isProcessing: true, hasError: false };

    case 'CALL_SUCCEEDED':
      return {
        ...state,
        isProcessing: false,
        hasError: false,
        data: action.payload
      };

    case 'CALL_FAILED':
      return { ...state, isProcessing: false, hasError: true };

    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(apiCallReducer, initialState);

  useEffect(() => {
    let hostIsMounted = true;

    const dispatchIfMounted = action => {
      if (hostIsMounted) {
        dispatch(action);
      }
    };

    const processApiCall = async () => {
      dispatch({ type: 'CALL_BEGAN' });

      try {
        const result = await apiServiceCall();
        dispatchIfMounted({ type: 'CALL_SUCCEEDED', payload: result });
      } catch (error) {
        dispatchIfMounted({ type: 'CALL_FAILED' });
      }
    };

    processApiCall();

    return () => {
      hostIsMounted = false;
    };
  }, [apiServiceCall, processTrigger]);

  return state;
};

export default useApiServiceCallLocal;
