import axiosInstance from "../../../../../../interceptors/Axios";

export async function inviteFriend(username: string) {
  const response = await axiosInstance.post('lobby/' + username + '/invite');
  return;
}