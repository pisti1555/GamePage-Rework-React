import css from './FitwGameOver.module.css';
import { GameStatus } from '../../../../../interfaces/GameStatus';
import { leaveGame } from '../../../../../services/game/fitw/InGameFitwService';

export default function FitwGameOver({stats}:{stats:GameStatus}) {
  return (
    <div className={css.gameOverContainer}>
        <h2>{stats.winnerPiece === 1 ? 'Fly' : 'Spiders'} won</h2>
        <h3>Piece Fly made {stats.movesOfMembers[0]} moves total</h3>
        <h3>Piece Spider made {stats.movesOfMembers[1]} moves total</h3>
        <button onClick={() => leaveGame()} className={css.backButton}>Return to Lobby</button>
      </div>
  );
}