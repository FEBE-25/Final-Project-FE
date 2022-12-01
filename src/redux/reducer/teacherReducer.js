import { GET_TEACHERS, DELETE_TEACHER } from "../action/teacherAction";

const initialState = {
  teachers: [],
};

function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
      };
    case DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
export default teacherReducer;
