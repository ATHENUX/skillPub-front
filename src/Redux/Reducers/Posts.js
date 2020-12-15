const initialState = [];

//management of the type of actions
const SET_POSTS = "setPosts";

//reducer
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POSTS:
      return payload;
    default:
      return state;
  }
};

//acciones
export const setPosts = (response) => {
  return {
    type: SET_POSTS,
    payload: response,
  };
};

export default reducer;
