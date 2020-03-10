import { useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import genericApiCallReducer from '../redux/generic-api-call-slice';
import {
  initialState,
  callBegan,
  callSuccess,
  callFailed
} from '../redux/generic-api-call-slice';

const useApiDeleteRedux = (
  deleteApiCall,
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

  const deleteRunner = async id => {
    localDispatch(callBegan());
    try {
      await deleteApiCall(id);
      safeDispatch(callSuccess());
      onSuccessActionCreator && globalDispatch(onSuccessActionCreator(id));
    } catch (error) {
      safeDispatch(callFailed);
      onErrorActionCreator && globalDispatch(onErrorActionCreator(error));
    }
  };

  const apiDelete = useCallback(deleteRunner, [deleteApiCall]);

  return [apiCallState, apiDelete];
};

export default useApiDeleteRedux;
