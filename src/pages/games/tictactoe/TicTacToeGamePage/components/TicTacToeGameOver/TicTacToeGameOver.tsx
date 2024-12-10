import { useNavigate } from 'react-router-dom';
import { GameStatus } from '../../../../../../interfaces/GameStatus';
import css from './TicTacToeGameOver.module.css';
import { leaveGame } from './TicTacToeGameOverService';
import { User } from '../../../../../../interfaces/User';

export default function TicTacToeGameOver({client, stats}: {client: User|undefined, stats: GameStatus}) {
  const navigate = useNavigate();

  if (!stats.inGameMembers.find(member => member.id === client?.id)) {
   navigate('/lobby');
  } 

  return (
    <div className={css.gameOverContainer}>
      <h2>{stats.winnerPiece === 1 && 'X won'}</h2>
      <h2>{stats.winnerPiece === 2 && 'O won'}</h2>
      <h2>{stats.winnerPiece === 3 && 'Tie'}</h2>
      <h3>Piece X made {stats.movesOfMembers[0]} moves total</h3>
      <h3>Piece O made {stats.movesOfMembers[1]} moves total</h3>
      <button onClick={() => leaveGame()} className={css.backButton}>Return to Lobby</button>
    </div>
  );
}