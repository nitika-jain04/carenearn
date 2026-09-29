import { actionType } from "../constants/actionType";

export const login = () => {
  return { type: actionType.LOGIN };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("loginTimestamp");
  localStorage.removeItem("selectedUserType");
  return { type: actionType.LOGOUT };
};

export const updateProfile = (profile) => ({
  type: actionType.UPDATE_PROFILE,
  payload: profile,
});
