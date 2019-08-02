import {
  FRIEND_DETAILS,
  FRIEND_DETAILS_SUCCESS,
  FRIEND_DETAILS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIEND_DETAILS:
      return { ...state, loading: true, message: 'Friend details loading' };
    case FRIEND_DETAILS_SUCCESS:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case FRIEND_DETAILS_FAIL:
      return { ...state, message: 'Friend details could not be retrieved!', loading: false };

    default:
      return state;
  }
};
