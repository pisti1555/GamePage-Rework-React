import axiosInstance from "../../../../interceptors/Axios";
import { Game } from "../../../../interfaces/Game";

export default async function loadFitwData(setGameData: React.Dispatch<React.SetStateAction<Game | undefined>>) {
  const response = await axiosInstance.get('games');
  const games:Game[] = response.data.data;
  const fitw = games.find(game => game.name === 'Fly in the web');
  setGameData(fitw);
}

export async function createFitwLobby(gameId: number|undefined) {
  if (!gameId) return;
  await axiosInstance.post('lobby/' + gameId.toString() + '/create');
}