import axiosInstance from "../../../../interceptors/Axios";
import { Game } from "../../../../interfaces/Game";
import { Lobby, LobbyInvitation } from "../../../../interfaces/Lobby";

export const selectGame = async (game: Game, setLobby: React.Dispatch<React.SetStateAction<Lobby | undefined>>) => {
  if (!game) return;
  const response = await axiosInstance.post('lobby/' + game.id + '/create');
  const lobby = response.data.data;
  setLobby(lobby);
};

export async function joinLobby(lobbyId: number) {
  const response = await axiosInstance.post('lobby/' + lobbyId + '/join');
  const lobby = response.data.data;
  return lobby;
}

export async function declineInvitation(invId: number) {
  const response = await axiosInstance.post('lobby/' + invId + '/decline');
  const lobby = response.data.data;
  return lobby;
}

export async function getInvitations() {
  const response = await axiosInstance.get('lobby/invitations');
  const invitations: LobbyInvitation[] = response.data.data;
  return invitations;
}

export const getAllGames = async () => {
  const response = await axiosInstance.get('games');
  return response.data.data;
};