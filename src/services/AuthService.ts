import axiosInstance from "../interceptors/Axios";

export const getUser = async () => {
  if (localStorage.getItem('JWToken') === null) return; 
  const response = await axiosInstance.get('user');
  return response.data.data;
};