import { actionType } from "../constants/actionType";

export const login = () => {
  return { type: actionType.LOGIN, payload: actionType.payload };
};
