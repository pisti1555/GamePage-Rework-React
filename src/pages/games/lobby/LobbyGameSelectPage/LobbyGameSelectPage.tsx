import React, { useEffect, useState } from 'react';
import css from './LobbyGameSelectPage.module.css';
import { Game } from '../../../../interfaces/Game';
import { LobbyInvitation, Lobby } from '../../../../interfaces/Lobby';
import { selectGame, joinLobby, declineInvitation, getInvitations, getAllGames } from './LobbyGameSelectService';

import defaultAvatar from '../../../../images/user.jpg';

interface Props {
  setLobby: React.Dispatch<React.SetStateAction<Lobby | undefined>>;
}

export default function LobbyGameSelectPage(props: Props) {
  const [games, setGames] = useState<Game[]>([]);
  const [invitations, setInvitations] = useState<LobbyInvitation[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const games = await getAllGames();
      setGames(games);
    };

    const getLobbyInvitations = async () => {
      const invitations = await getInvitations();
      setInvitations(invitations);
    };

    getGames();
    getLobbyInvitations();
  }, []);

  return (
    <div className={css.page}>
      <ul>
        <h1>Join a lobby</h1>
        {invitations.map(inv => {
          return (
            <li key={inv.invitationId} className={css.rowInvitation}>
              <div className={css.imageContainer}>
                <img src={inv.inviter.avatar ?? defaultAvatar} alt={inv.inviter.username} />
              </div>
              <h3>{inv.inviter.username}</h3>
              <div className={css.buttonContainer}>
                <button onClick={() => joinLobby(inv.lobbyId)}>Join</button>
                <button onClick={() => declineInvitation(inv.invitationId)}>Decline</button>
              </div>  
            </li>
          );
        })}
        {invitations.length === 0 && (
          <h3>You do not have any invitations</h3>
        )}
      </ul>

      <ul>
        <h1>Create a new lobby</h1>
        {games.map(game => {
          return (
            <li key={game.id} className={css.rowGame} onClick={() => selectGame(game, props.setLobby)}>
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