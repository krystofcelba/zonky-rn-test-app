import { UPDATE_USERNAME, UPDATE_PASSWORD, STORE_AUTH_TOKEN } from '../actions/auth';

const authReducer = (
  state = { token: null, credentials: { username: '', password: '' } },
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
