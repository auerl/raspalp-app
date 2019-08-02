import {
    FRIENDS,
    FRIENDS_SUCCESS,
    FRIENDS_FAIL
  } from './types';
  import { USER_LIST_USERS_ENDPOINT } from '../network/ApiConst';
  import { ApiCall, CallAPI } from '../network/ApiUtils';

export const searchFriends = (token, searchText='') => (dispatch) => {
  dispatch({ type: FRIENDS });
  var url = USER_LIST_USERS_ENDPOINT;
  if (searchText != '') {
    var url = url + '?search='+searchText
  }
  const devices = ApiCall(
    url,
    'GET',
    {},
    {'Authorization': token},
    response => onGetFriendsSuccess(dispatch, response),
    error => onGetFriendsError(dispatch, error)
  );
};

const onGetFriendsSuccess = (dispatch, response) => {
  if (response && response.meta.code === 200 ) {
    dispatch({
      type: FRIENDS_SUCCESS,
      payload: response.data || []
    });
  }
}

const onGetFriendsError = (dispatch, error) => {
  dispatch({ type: FRIENDS_FAIL });
  console.log('onError: ', error);
}
