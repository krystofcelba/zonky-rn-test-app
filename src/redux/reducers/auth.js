import { DEV_ZONKY_PASSWORD, DEV_ZONKY_USERNAME } from '../../constants/config';
import { STORE_AUTH_TOKEN, UPDATE_PASSWORD, UPDATE_USERNAME } from '../actions/auth';

const authReducer = (
  state = {
    token: null,
    credentials: { username: DEV_ZONKY_USERNAME || '', password: DEV_ZONKY_PASSWORD || '' },
  },
  action,
) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      return { ...state, credentials: { ...state.credentials, username: action.username } };
    }
    case UPDATE_PASSWORD: {
      return { ...state, credentials: { ...state.credentials, password: action.password } };
    }
    case STORE_AUTH_TOKEN: {
      return { ...state, token: action.token };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;

export const getAuthToken = state => state.auth.token;
