import { Link } from 'react-router-dom';
import css from './FitwIndexPage.module.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../../interceptors/Axios';
import { Game } from '../../../../interfaces/Game';

export default function FitwIndexPage() {
  const [gameData, setGameData] = useState<Game>();

  useEffect(() => {
    const fetchGameData = async () => {
      const response = await axiosInstance.get('games');
      const games:Game[] = response.data.data;
      const fitw = games.find(game => game.name === 'Fly in the web');
      setGameData(fitw);
    };

    fetchGameData();
  }, []);

  return (
    <div 
      className={css.container}
      style={{
        backgroundImage: 'url(' + gameData?.imageUrl + ')'
      }}  
    >
      <div className={css.row}>
          <Link to='/fly-in-the-web/lobby' type="button" className={css.button}>Play</Link>
      </div>
      <div className={css.row}>
          <Link to='/fly-in-the-web/scoreboard' type="button" className={css.button}>Scoreboard</Link>
      </div>
    </div>
  );
}