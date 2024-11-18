import axiosInstance from "../interceptors/Axios";


export const getUserByUsername = async (username?: string) => {
  if (!username) return;
  if (localStorage.getItem('JWToken') === null) return; 
  const response = await axiosInstance.get('user/' + username);
  return response.data.data;
};

export const getFriendsOfUser = async (username?: string) => {
  if (!username) return;
  if (localStorage.getItem('JWToken') === null) return; 
  const response = await axiosInstance.get('friends/' + username);
  return response.data.data;
};