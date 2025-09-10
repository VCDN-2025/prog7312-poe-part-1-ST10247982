export const apiHandler = async (apiCall) => {
  try {
    const response = await apiCall();
    return { apiSuccess: true, message: response.data, status: response.status };
  } catch (error) {
    return { apiSucces: false, message: "Something went wrong", status: 500 };
  }
};
