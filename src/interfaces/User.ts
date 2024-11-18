import { GameStats } from "./GameStats";

export interface User {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  description?: string,
  avatar?: string,
}