import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "../../interfaces/Game";
import axiosInstance from "../../interceptors/Axios";

import css from './HomePage.module.css';

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('games');
        setGames(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchGames();
  }, []);


  return (
    <div className={css.gameList}>
      {games.map(game => {
        return (
          <Link to={game.url} className={css.game} key={game.id}>
            <div className={css.imageContainer}>
              <img src={game.thumbnailUrl} alt="" />
            </div>
            <p>{game.name}</p>
          </Link>);
      })}
    </div>
  );
}