const initialState = {
  Follower: [],
  Following: [],
  active: true,
  createdAt: "",
  dateOfBirth: "",
  email: "",
  firstName: "",
  follower: [],
  following: [],
  gender: "M",
  groupsList: [],
  lastName: "",
  listOfAptitudes: [],
  location: { latitude: 0, longitude: 0 },
  password: "",
  phone: "",
  postsList: [],
  savedposts: [],
  sharedPosts: [],
  updatedAt: "",
  __v: 0,
  _id: "",
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
