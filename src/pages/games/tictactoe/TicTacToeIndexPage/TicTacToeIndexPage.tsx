import { useEffect, useState } from 'react';
import css from './TicTacToeIndexPage.module.css';
import { Game } from '../../../../interfaces/Game';
import { Link, useNavigate } from 'react-router-dom';
import loadTicTacToeData, { createTicTacToeLobby } from './TicTacToeIndexService';

export default function TicTacToeIndexPage() {
  const [gameData, setGameData] = useState<Game>();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await loadTicTacToeData(setGameData);
    };
    load();
  }, []);

  return (
    <div 
      className={css.page}
      style={{
        backgroundImage: 'url(' + gameData?.imageUrl + ')'
      }}  
    >
      <div className={css.container}>
        <div className={css.row}>
          <button onClick={async () => {
            await createTicTacToeLobby(gameData?.id);
            navigate('/lobby');
          }} type="button" className={css.button}
          >Play</button>
        </div>
        <div className={css.row}>
          <Link to='/tic-tac-toe/scoreboard' type="button" className={css.button}>Scoreboard</Link>
        </div>
      </div>
    </div>
  );
}