import axiosInstance from "../../../interceptors/Axios";
import { Game } from "../../../interfaces/Game";
import { GameStats } from "../../../interfaces/GameStats";
import { User } from "../../../interfaces/User";
import { getFriendsOfUser, getUserByUsername } from "../../../services/UserService";

export async function loadProfile(
  username: string|undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setFriends: React.Dispatch<React.SetStateAction<User[]>>,
  setGames: React.Dispatch<React.SetStateAction<Game[]>>,
  setGameStats: React.Dispatch<React.SetStateAction<GameStats[]>>
) {
  try {
    setLoading(true);
    const user = await getUserByUsername(username);
    setUser(user);
    const friends = await getFriendsOfUser(username);
    setFriends(friends);
    const games = await getAllGames();
    setGames(games);
    const fitw = await getGameStatsOfUser('fly-in-the-web', username);
    const tictactoe = await getGameStatsOfUser('tic-tac-toe', username);
    const stats: GameStats[] = [fitw, tictactoe];
    setGameStats(stats);
    setLoading(false);
  } catch (e) {
    setUser(undefined);
    setFriends([]);
    setGames([]);
    setGameStats([]);
  }
}

const getAllGames = async () => {
  const response = await axiosInstance.get('games');
  return response.data.data;
};

const getGameStatsOfUser = async (game:string, username?: string) => {
  if (!username) return;
  const response = await axiosInstance.get('games/stats/' + game + '/' + username);
  return response.data.data;
};