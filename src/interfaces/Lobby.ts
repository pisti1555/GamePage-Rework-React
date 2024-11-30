import { User } from "./User";

export interface Lobby {
  id: number;
  members: User[];
  readyMembers: User[];
  inGameMembers: User[];
  maxPlayers: number;
  gameName: string;
  gameId: number;
}

export interface LobbyInvitation {
  invitationId: number;
  lobbyId: number;
  inviter: User;
  invited: User;
}