export const GET_TEACHERS = "GET_TEACHERS";
export const DELETE_TEACHER = "DELETE_TEACHER";

const API_URL = "https://634a01375df95285140a732e.mockapi.io/teachers";

export const getTeachers = () => {
  try {
    return async (dispatch) => {
      const result = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      if (data) {
        dispatch({
          type: "GET_TEACHERS",
          payload: data,
        });
      } else {
        console.log("unable to fetch data");
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteTeacher = (id) => {
  try {
    return async (dispatch) => {
      const result = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      if (data) {
        dispatch({
          type: "DELETE_TEACHER",
          payload: id,
        });
      } else {
        console.log("unable to delete data");
      }
    };
  } catch (error) {
    console.log(error);
  }
};
