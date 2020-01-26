import {
  UserEndpoints,
  RequestMethods,
  HttpStatus
} from '../network/ApiConst';
import { Friend } from './types';
import { ApiCall } from '../network/ApiUtils';

export const searchFriends = (token, searchText='') => (dispatch) => {
  dispatch({ type: Friend.list.default });
  var url = UserEndpoints.listUsers;
  if (searchText != '') { var url = url + '?search='+searchText}
  const devices = ApiCall(
    url, RequestMethods.get, {}, {'Authorization': token},
    response => onGetFriendsSuccess(dispatch, response),
    error => onGetFriendsError(dispatch, error)
  );
};

const onGetFriendsSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Friend.list.success,
      payload: response.data || []
    });
  }
}

const onGetFriendsError = (dispatch, error) => {
  dispatch({ type: Friend.list.fail });
  console.log('onError: ', error);
}
