import { Device } from '../actions/types';
import { actionStrings } from '../config/strings';

const INITIAL_STATE = {
  data: [],
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Device.list.default:
      return { ...state, loading: true, message: actionStrings.device.listLoading };
    case Device.list.success:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case Device.list.fail:
      return { ...state, message: actionStrings.device.listError, loading: false };
    default:
      return state;
  }
};
