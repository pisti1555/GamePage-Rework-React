import axiosInstance from "../../../../../../interceptors/Axios";

export async function readyUp() {
  const response = await axiosInstance.post('lobby/ready');
  return;
}

export async function unready() {
  const response = await axiosInstance.post('lobby/unready');
  return;
}

export async function startGame() {
  const response = await axiosInstance.post('lobby/start');
  return response.data.data;
}

export async function leaveLobby() {
  await axiosInstance.post('lobby/leave');
}