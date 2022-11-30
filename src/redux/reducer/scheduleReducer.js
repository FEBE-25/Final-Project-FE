import { GET_DATA_ORDER } from "../action/scheduleAction";

const initialState = {
  schedules: [],
};

function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_ORDER:
      return {
        ...state,
        schedules: action.payload,
      };
    default:
      return state;
  }
}
export default scheduleReducer;
