export const INITIAL_REST = {
  restaurantName: "",
  description: "",
  openingTimes: "",
  closingTimes: "",
  phoneNumber: "",
  addressLine1: "",
  area: "",
  postcode: "",
  websiteURL: "",
  photoURL: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "REST":
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
