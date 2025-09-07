const apiHandler = async (apiCall) => {
  try {
    const response = await apiCall();
    return { success: true, message: response.data, status: response.status };
  } catch (error) {
    return { succes: false, message: response.data, status: response.status };
  }
};
