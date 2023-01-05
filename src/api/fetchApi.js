import csrftoken from "../utils/CSRFToken";

const fetchApi = async ({ url, reqMethod, userData, access }) => {
  if (reqMethod === "GET") {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(access),
      },
    });
    return response;
  } else if (reqMethod === "POST") {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(access),
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(userData),
    });
    return response;
  } else if (reqMethod === "PUT") {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(userData),
    });
    return response;
  } else if (reqMethod === "DELETE") {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/type",
        "X-CSRFToken": csrftoken,
      },
    });
    return response;
  }
};
export default fetchApi;
