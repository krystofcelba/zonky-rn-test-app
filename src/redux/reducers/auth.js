import { SAVE_AUTH_TOKEN } from '../actions/actionTypes';

const authReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case SAVE_AUTH_TOKEN: {
      return { ...state, token: action.token };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
