import { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

const apiCallReducer = (state, action) => {
  switch (action.type) {
    case 'CALL_BEGAN':
      return { ...state, isProcessing: true, hasError: false };

    case 'CALL_SUCCEEDED':
      return { ...state, isProcessing: false, hasError: false };

    case 'CALL_FAILED':
      return { ...state, isProcessing: false, hasError: true };

    default:
      return state;
  }
};

const useApiServiceCallRedux = (
  apiServiceCall,
  onSuccessActionCreator,
  onErrorActionCreator,
  processTrigger
) => {
  const globalDispatch = useDispatch();
  const initialState = { isProcessing: false, hasError: false };
  const [state, localDispatch] = useReducer(apiCallReducer, initialState);

  useEffect(() => {
    let hostIsMounted = true;

    const dispatchIfMounted = action => {
      if (hostIsMounted) {
        localDispatch(action);
      }
    };

    const processApiCall = async () => {
      localDispatch({ type: 'CALL_BEGAN' });

      try {
        const result = await apiServiceCall();

        dispatchIfMounted({ type: 'CALL_SUCCEEDED' });
        if (onSuccessActionCreator) {
          globalDispatch(onSuccessActionCreator(result));
        }
      } catch (error) {
        dispatchIfMounted({ type: 'CALL_FAILED' });
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
    globalDispatch
  ]);

  return state;
};

export default useApiServiceCallRedux;
