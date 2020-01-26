import { Friend } from '../actions/types';
import { actionStrings } from '../config/strings';

const INITIAL_STATE = {
  data: [],
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Friend.list.default:
      return { ...state, loading: true, message: actionStrings.friend.loading };
    case Friend.list.success:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case Friend.list.fail:
      return { ...state, message: actionStrings.friend.error, loading: false };

    default:
      return state;
  }
};
