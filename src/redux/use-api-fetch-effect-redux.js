import { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import genericApiCallReducer from './generic-api-call-slice';
import {
  initialState,
  callBegan,
  callSuccess,
  callFailed
} from './generic-api-call-slice';

const useApiFetchEffectRedux = (
  apiServiceCall,
  onSuccessActionCreator,
  onErrorActionCreator,
  processTrigger
) => {
  const globalDispatch = useDispatch();
  const [apiCallState, localDispatch] = useReducer(
    genericApiCallReducer,
    initialState
  );

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
    globalDispatch
  ]);

  return apiCallState;
};

export default useApiFetchEffectRedux;
