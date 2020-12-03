const initialState = "light";

//management of the type of actions
const CHANGE_THEME_MODE = "CHANGE_THEME_MODE";

//reducer
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_THEME_MODE:
      return payload;
    default:
      return state;
  }
};

//acciones
export const changeThemeMode = (response) => {
  return {
    type: CHANGE_THEME_MODE,
    payload: response === "light" ? "dark" : "light",
  };
};

export default reducer;
