const initialState = "light";

//actions
const CHANGE_THEME_MODE = "CHANGE_THEME_MODE";

//reducers
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_THEME_MODE:
      return payload;
    default:
      return state;
  }
};

//action generators
export const changeThemeMode = (response) => {
  return {
    type: CHANGE_THEME_MODE,
    payload: response === "dark" ? "light" : "dark",
  };
};

export default reducer;
