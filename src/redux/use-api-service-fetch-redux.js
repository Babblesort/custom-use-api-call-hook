import { useState, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BEGAN':
      return { ...state, isLoading: true, hasError: false };
    case 'FETCH_SUCCEEDED':
      return {
        ...state,
        isLoading: false,
        hasError: false
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

const useApiServiceFetchRedux = (
  apiServiceCall,
  onSuccessActionCreator,
  onErrorActionCreator,
  refetchTrigger
) => {
  const globalDispatch = useDispatch();
  const [state, localDispatch] = useReducer(fetchReducer, {
    isLoading: false,
    hasError: false
  });
  const [apiCall] = useState(() => apiServiceCall);

  useEffect(() => {
    let hostIsMounted = true;
    const dispatchIfMounted = action => {
      if (hostIsMounted) {
        localDispatch(action);
      }
    };

    const fetchData = async () => {
      localDispatch({ type: 'FETCH_BEGAN' });

      try {
        const result = await apiCall();
        dispatchIfMounted({ type: 'FETCH_SUCCEEDED' });
        if (onSuccessActionCreator) {
          globalDispatch(onSuccessActionCreator(result));
        }
      } catch (error) {
        dispatchIfMounted({ type: 'FETCH_FAILED' });
        if (onErrorActionCreator) {
          globalDispatch(onErrorActionCreator(error));
        }
      }
    };

    fetchData();

    return () => {
      hostIsMounted = false;
    };
  }, [
    apiCall,
    onSuccessActionCreator,
    onErrorActionCreator,
    refetchTrigger,
    globalDispatch
  ]);

  return state;
};

export default useApiServiceFetchRedux;
