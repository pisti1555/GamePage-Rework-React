import { User } from "./User";

export interface GameStatus {
  winnerPiece: number;
  inGameMembers: User[];
  movesOfMembers: number[];
}