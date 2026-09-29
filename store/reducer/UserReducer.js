import { actionType } from "../constants/actionType";

const initialState = {
  profile: null, // Start with null instead of default data
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_PROFILE:
      return {
        ...state,
        profile: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
