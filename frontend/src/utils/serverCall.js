import axios from "axios";

export const serverCall = async (
  url,
  method = "GET", // default method
  data = {},
  additionalHeader = {}
) => {
  try {
    const token = localStorage.getItem("authToken");
    // Check if data is FormData
    const isFormData = data instanceof FormData;

    const headers = {
      Authorization: `Bearer ${token}`,
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...additionalHeader,
    };

    const requestObject = {
      url,
      method,
      headers,
    };

    // Only attach `data` for POST, PUT, PATCH (not for GET)
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())) {
      requestObject.data = data;
    }

    const response = await axios.request(requestObject);

    return {
      success: [200, 201].includes(response.status),
      data: response.data,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message:
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Network error",
    };
  }
};
