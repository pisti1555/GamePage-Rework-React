import { Link, useNavigate } from 'react-router-dom';
import css from './FitwIndexPage.module.css';
import { useEffect, useState } from 'react';
import { Game } from '../../../../interfaces/Game';
import loadFitwData, { createFitwLobby } from './FitwIndexService';

export default function FitwIndexPage() {
  const [gameData, setGameData] = useState<Game>();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await loadFitwData(setGameData);
    };

    load();
  }, []);

  return (
    <div 
      className={css.container}
      style={{
        backgroundImage: 'url(' + gameData?.imageUrl + ')'
      }}
    >
      <div className={css.row}>
        <button onClick={async () => {
          await createFitwLobby(gameData?.id);
          navigate('/lobby');
        }} type="button" className={css.button}
        >Play</button>
      </div>
      <div className={css.row}>
        <Link to='/fly-in-the-web/scoreboard' type="button" className={css.button}>Scoreboard</Link>
      </div>
    </div>
  );
}