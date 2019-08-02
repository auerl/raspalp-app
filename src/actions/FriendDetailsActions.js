import {
  FRIEND_DETAILS,
  FRIEND_DETAILS_SUCCESS,
  FRIEND_DETAILS_FAIL
} from './types';
import { USER_DETAILS_ENDPOINT } from '../network/ApiConst';
import { ApiCall } from '../network/ApiUtils';


export const getFriendDetails = (token, userId) => (dispatch) => {
  dispatch({ type: FRIENDS });
  var url = USER_LIST_USERS_ENDPOINT + userId;
  const devices = ApiCall(
    url,
    'GET',
    {},
    {'Authorization': token},
    response => onGetFriendDetailsSuccess(dispatch, response),
    error => onGetFriendDetailsError(dispatch, error)
  );
};

const onGetFriendDetailsSuccess = (dispatch, response) => {
  if (response && response.meta.code === 200 ) {
    dispatch({
      type: FRIEND_DETAILS_SUCCESS,
      payload: response.data || []
    });
  }
}

const onGetFriendDetailsError = (dispatch, error) => {
  dispatch({ type: FRIEND_DETAILS_FAIL });
  console.log('onError: ', error);
}
