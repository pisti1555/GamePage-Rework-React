import React, { useEffect, useState } from 'react';
import css from './LobbyGameSelectPage.module.css';
import { Game } from '../../../interfaces/Game';
import { Lobby } from '../../../interfaces/Lobby';
import { createLobby } from '../../../services/LobbyService';
import { getAllGames } from '../../../services/GameService';

interface Props {
  setLobby: React.Dispatch<React.SetStateAction<Lobby | undefined>>;
}

export default function LobbyGameSelectPage(props: Props) {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game|undefined>();

  useEffect(() => {
    const getGames = async () => {
      const games = await getAllGames();
      setGames(games);
    };

    getGames();
  }, []);

  useEffect(() => {
    const create = async () => {
      if (!selectedGame) return;
      const lobby = await createLobby(selectedGame.id);
      props.setLobby(lobby);
    };
    
    create();
  }, [selectedGame]);

  return (
    <div className={css.page}>
      <ul>
        {games.map(game => {
          return (
            <li key={game.id} className={css.row} onClick={() => setSelectedGame(game)}>
              <div className={css.imageContainer}>
                <img src={game.thumbnailUrl} alt={game.name} />
              </div>
              <h2>{game.name}</h2>
              <p>Max players: {game.maxPlayers}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}