import axiosInstance from "../../interceptors/Axios";
import { Lobby, LobbyInvitation } from "../../interfaces/Lobby";

export async function getLobby() {
  try {
    const response = await axiosInstance.get('lobby');
    const lobby = response.data.data;
    return lobby;
  } catch (e) {
    return undefined;
  }
}

export async function createLobby(gameId: number) {
  if (!gameId) return;
  const response = await axiosInstance.post('lobby/' + gameId + '/create');
  const lobby = response.data.data;
  return lobby;
}

export async function joinLobby(lobbyId: number) {
  const response = await axiosInstance.post('lobby/' + lobbyId + '/join');
  const lobby = response.data.data;
  console.log(response);
  
  return lobby;
}

export async function declineInvitation(invId: number) {
  const response = await axiosInstance.post('lobby/' + invId + '/decline');
  const lobby = response.data.data;
  return lobby;
}

export async function leaveLobby() {
  await axiosInstance.post('lobby/leave');
}

export async function inviteFriend(username: string) {
  const response = await axiosInstance.post('lobby/' + username + '/invite');
  return;
}

export async function getInvitations() {
  const response = await axiosInstance.get('lobby/invitations');
  const invitations: LobbyInvitation[] = response.data.data;
  return invitations;
}

export async function kickPlayer(username: string) {
  const response = await axiosInstance.post('lobby/kick/' + username);
  return;
}

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