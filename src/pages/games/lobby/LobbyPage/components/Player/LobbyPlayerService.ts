import axiosInstance from "../../../../../../interceptors/Axios";

export async function kickPlayer(username: string) {
  const response = await axiosInstance.post('lobby/kick/' + username);
  return;
}