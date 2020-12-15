const initialState = [];

//management of the type of actions
const SEARCH_USERS = "searchUsers";

//reducer
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_USERS:
      return payload;
    default:
      return state;
  }
};

//acciones
export const setSearchedUsers = (response) => {
  return { type: SEARCH_USERS, payload: response };
};

export default reducer;
