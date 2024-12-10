import { useEffect, useState } from 'react';
import css from './FitwGamePage.module.css';
import FitwGameBoard from './components/FitwGameBoard/FitwGameBoard';
import FitwGameOver from './components/FitwGameOver/FitwGameOver';
import { GameStatus } from '../../../../interfaces/GameStatus';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../interfaces/User';

import { update } from './components/FitwGameBoard/FitwGameBoardService';
import { connect, leaveGame } from './FitwGameService';

interface Props {
  client: User|undefined;
}

export default function FitwGamePage(props: Props) {
  const navigate = useNavigate();
  const [connectionMap, setConnectionMap] = useState<Map<number, number[]>>(new Map());
  const [piecePositions, setPiecePositions] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    winnerPiece: 0,
    inGameMembers: [],
    movesOfMembers: []
  });

  useEffect(() => {
    const load = async () => {
      await connect(
        setGameStatus,
        setConnectionMap,
        setPiecePositions
      );
      await update(
        setConnectionMap, 
        setPiecePositions,
        setGameStatus
      );
    };
    
    load();
  }, []);

  if (gameStatus.winnerPiece !== 0) {
    return <FitwGameOver stats={gameStatus} />;
  }

  if (!gameStatus.inGameMembers.find(
    member => member.id === props.client?.id
  )) navigate('/lobby');
 
  return (
    <div className={css.page}>
      <button onClick={() => leaveGame()} className={css.backButton}>Leave game</button>
      <FitwGameBoard connectionMap={connectionMap} piecePositions={piecePositions} />
    </div>
  );
}