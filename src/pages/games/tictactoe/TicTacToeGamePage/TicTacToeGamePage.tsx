import css from './TicTacToeGamePage.module.css';

import { useEffect, useState } from "react";
import { GameStatus } from "../../../../interfaces/GameStatus";
import TicTacToeGameOver from "./components/TicTacToeGameOver/TicTacToeGameOver";
import TicTacToeGameBoard from "./components/TicTacToeGameBoard/TicTacToeGameBoard";
import { User } from '../../../../interfaces/User';
import { useNavigate } from 'react-router-dom';

import { connectToWs, leaveGame, update } from './TicTacToeGameService';

interface Props {
  client: User|undefined;
}
export default function TicTacToeGamePage(props: Props) {
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    winnerPiece: 0,
    inGameMembers: [],
    movesOfMembers: []
  });
  const [gameboard, setGameboard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  useEffect(() => {
    const load = async () => {
      await connectToWs(
        setGameStatus,
        setGameboard
      );
      await update(
        setGameStatus,
        setGameboard
      );
    };
    
    load();
  }, []);

  if (gameStatus?.winnerPiece !== 0) {
    return <TicTacToeGameOver client={props.client} stats={gameStatus} />;
  }

  if (!gameStatus.inGameMembers.find(
    member => member.id === props.client?.id
  )) navigate('/lobby');

  return (
    <div className={css.page}>
      <button onClick={() => leaveGame(setGameStatus)} className={css.backButton}>Leave game</button>
      <TicTacToeGameBoard gameStatus={gameStatus} gameboard={gameboard} />
    </div>
  );
}