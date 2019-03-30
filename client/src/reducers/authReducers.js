import {auth} from '../actions/index';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case auth.LOGIN_LOADING:
        console.log("Logging in");
        return Object.assign({}, state, {
          login_loading: true
        });
      break;
    case auth.LOGGED_IN:
        console.log("Logged in");
        return {...state, logged_in: true, login_loading: false, username: action.payload.user, first_name: action.payload.first_name, last_name: action.payload.last_name, email: action.payload.email};
      break
    default:
      return state;
      break;
  }
};

export default authReducer;
