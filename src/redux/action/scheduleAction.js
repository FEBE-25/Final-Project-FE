export const GET_DATA_ORDER = "GET_DATA_ORDER";

const ORDER_API = "https://634a01375df95285140a732e.mockapi.io/order";

export const getDataOrder = () => {
  try {
    return async (dispatch) => {
      const result = await fetch(ORDER_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      if (data) {
        dispatch({
          type: "GET_DATA_ORDER",
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
