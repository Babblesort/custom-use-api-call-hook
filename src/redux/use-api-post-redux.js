import { useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import genericApiCallReducer from '../redux/generic-api-call-slice';
import {
  initialState,
  callBegan,
  callSuccess,
  callFailed
} from '../redux/generic-api-call-slice';

const useApiPostRedux = (
  postApiCall,
  onSuccessActionCreator,
  onErrorActionCreator
) => {
  const globalDispatch = useDispatch();
  const [apiCallState, localDispatch] = useReducer(
    genericApiCallReducer,
    initialState
  );

  let hostIsMounted = true;
  const safeDispatch = action => hostIsMounted && localDispatch(action);

  const postRunner = async payload => {
    localDispatch(callBegan());
    try {
      const result = await postApiCall(payload);
      safeDispatch(callSuccess());
      const newItem = {
        ...payload,
        id: result
      };
      onSuccessActionCreator && globalDispatch(onSuccessActionCreator(newItem));
    } catch (error) {
      safeDispatch(callFailed);
      onErrorActionCreator && globalDispatch(onErrorActionCreator(error));
    }
  };

  const apiPost = useCallback(postRunner, [postApiCall]);

  return [apiCallState, apiPost];
};

export default useApiPostRedux;
