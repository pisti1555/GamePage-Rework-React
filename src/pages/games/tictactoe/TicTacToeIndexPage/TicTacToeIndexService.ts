import axiosInstance from "../../../../interceptors/Axios";
import { Game } from "../../../../interfaces/Game";

export default async function loadTicTacToeData(setGameData: React.Dispatch<React.SetStateAction<Game | undefined>>) {
  const response = await axiosInstance.get('games');
  const games:Game[] = response.data.data;
  const tictactoe = games.find(game => game.name === 'TicTacToe');
  setGameData(tictactoe);
}

export async function createTicTacToeLobby(gameId: number|undefined) {
  if (!gameId) return;
  await axiosInstance.post('lobby/' + gameId.toString() + '/create');
}