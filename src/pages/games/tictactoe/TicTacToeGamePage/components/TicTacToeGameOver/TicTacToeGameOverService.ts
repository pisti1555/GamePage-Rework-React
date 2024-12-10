import axiosInstance from "../../../../../../interceptors/Axios";

export async function leaveGame() {
  const response = await axiosInstance.post('game/tic-tac-toe/leave');
}