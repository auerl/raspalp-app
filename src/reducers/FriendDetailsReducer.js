import { Friend } from '../actions/types';
import { actionStrings } from '../config/strings';

const INITIAL_STATE = {
  data: {},
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Friend.details.default:
      return { ...state, loading: true, message: actionStrings.friend.detailsloading };
    case Friend.details.success:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case Friend.details.fail:
      return { ...state, message: actionStrings.friend.detailsError, loading: false };

    default:
      return state;
  }
};
