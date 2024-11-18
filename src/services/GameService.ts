import axiosInstance from "../interceptors/Axios";

export const getAllGames = async () => {
  const response = await axiosInstance.get('games');
  return response.data.data;
};

export const getGameStatsOfUser = async (game:string, username?: string) => {
  if (!username) return;
  const response = await axiosInstance.get('games/stats/' + game + '/' + username);
  return response.data.data;
};
