import { User } from "./User";

export interface Lobby {
  id: number;
  members: User[];
  readyMembers: User[];
  admin: User;
  gameName: string;
  gameId: number;
  maxPlayers: number;
  isReady: boolean;
  isStarted: boolean;
}