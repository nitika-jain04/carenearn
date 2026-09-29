import { actionType } from "../constants/actionType";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

const checkValidSession = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return false;

    const timestamp = localStorage.getItem("loginTimestamp");
    if (timestamp) {
      const isExpired = Date.now() - Number(timestamp) > TWENTY_FOUR_HOURS_MS;
      if (isExpired) {
        localStorage.removeItem("user");
        localStorage.removeItem("loginTimestamp");
        localStorage.removeItem("selectedUserType");
        return false;
      }
    } else {
      // Set timestamp for legacy/existing session if missing
      localStorage.setItem("loginTimestamp", String(Date.now()));
    }

    return true;
  } catch (e) {
    return false;
  }
};

const initialState = { login: checkValidSession() };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return { ...state, login: true };

    case actionType.LOGOUT:
      return { ...state, login: false };

    default:
      return state;
  }
};

export default loginReducer;
