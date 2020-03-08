import { useState, useEffect, useReducer } from 'react';

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BEGAN':
      return { ...state, isLoading: true, hasError: false };
    case 'FETCH_SUCCEEDED':
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload
      };
    case 'FETCH_FAILED':
      return {
        ...state,
        isLoading: false,
        hasError: true
      };
    default:
      return state;
  }
};

const useApiServiceFetchLocal = (
  apiServiceCall,
  initialData,
  refetchTrigger
) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    hasError: false,
    data: initialData
  });
  const [apiCall] = useState(() => apiServiceCall);

  useEffect(() => {
    let hostIsMounted = true;
    const dispatchIfMounted = action => {
      if (hostIsMounted) {
        dispatch(action);
      }
    };

    const fetchData = async () => {
      dispatch({ type: 'FETCH_BEGAN' });

      try {
        const result = await apiCall();
        dispatchIfMounted({ type: 'FETCH_SUCCEEDED', payload: result });
      } catch (error) {
        dispatchIfMounted({ type: 'FETCH_FAILED' });
      }
    };

    fetchData();

    return () => {
      hostIsMounted = false;
    };
  }, [apiCall, refetchTrigger]);

  return state;
};

export default useApiServiceFetchLocal;
