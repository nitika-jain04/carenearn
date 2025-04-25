import { actionType } from "../constants/actionType";

const initialState = { login: false };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return { ...state, login: true };

    default:
      return state;
  }
};

export default loginReducer;
