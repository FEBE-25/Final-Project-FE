export const GET_TEACHERS = "GET_TEACHERS";

const API_URL =
  "https://final-project-be-production-0be5.up.railway.app/pengajar";

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
      if (data.data) {
        dispatch({
          type: "GET_TEACHERS",
          payload: data.data,
        });
      } else {
        console.log("unable to fetch data");
      }
    };
  } catch (error) {
    console.log(error);
  }
};
