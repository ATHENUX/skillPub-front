const InitialSpinner = false;

//actions
const CHANGE_SHOW_SPINNER = "CHANGE_SHOW_SPINNER";

//reducers
const reducer = (state = InitialSpinner, { type, payload }) => {
  switch (type) {
    case CHANGE_SHOW_SPINNER:
      return payload;
    default:
      return state;
  }
};

export const changeShowSpinner = (data) => {
  return {
    type: CHANGE_SHOW_SPINNER,
    payload: data,
  };
};

export default reducer;
