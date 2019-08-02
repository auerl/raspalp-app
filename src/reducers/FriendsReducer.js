import {
  FRIENDS,
  FRIENDS_SUCCESS,
  FRIENDS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIENDS:
      return { ...state, loading: true, message: 'Friends list loading' };
    case FRIENDS_SUCCESS:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case FRIENDS_FAIL:
      return { ...state, message: 'Friends list could not be retrieved!', loading: false };

    default:
      return state;
  }
};
