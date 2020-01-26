import {
  UserEndpoints,
  RequestMethods,
  HttpStatus
} from '../network/ApiConst';
import { Friend } from './types';
import { ApiCall } from '../network/ApiUtils';

export const getFriendDetails = (token, userId) => (dispatch) => {
  dispatch({ type: Friend.details.default });
  var url = UserEndpoints.getDetails + userId;
  const devices = ApiCall(
    url, RequestMethods.get, {}, {'Authorization': token},
    response => onGetFriendDetailsSuccess(dispatch, response),
    error => onGetFriendDetailsError(dispatch, error)
  );
};

const onGetFriendDetailsSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Friend.details.success,
      payload: response.data || []
    });
  }
}

const onGetFriendDetailsError = (dispatch, error) => {
  dispatch({ type: Friend.details.fail });
  console.log('onError: ', error);
}
