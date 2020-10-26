//initial state
const initialState = {
  name: "",
  lastName: "",
  firstName: "",
};

//management of the type of actions
const GET_USER_DATA = "getUserData";

//reducer
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_DATA:
      return payload;

    default:
      return state;
  }
};

//acciones
export const getUserData = (response) => {
  return {
    type: GET_USER_DATA,
    payload: response,
  };
};

export default reducer;
