import css from './LobbyPlayer.module.css';

import defaultAvatar from '../../../../../../images/user.jpg';
import { User } from '../../../../../../interfaces/User';
import { FaLaptop } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Lobby } from '../../../../../../interfaces/Lobby';

interface Props {
  user?: User;
  lobby: Lobby;
  isComputer?: boolean;
}

export default function LobbyPlayer(props: Props) {
  const [isReady, setReady] = useState<boolean>(false);
  const [isInGame, setInGame] = useState<boolean>(false);

  useEffect(() => {
    const ready = props.lobby.readyMembers?.some(member => member.id === props.user?.id);
    const inGame = props.lobby.inGameMembers?.some(member => member.id === props.user?.id);

    setReady(ready ?? false);
    setInGame(inGame ?? false);
  }, [props.lobby]);

  return (
    <div className={css.playerContainer}>
      {props.isComputer ? (
        <>
          <FaLaptop />
          <h3>Computer</h3>
          <p className={css.isReady}>Ready</p>
        </>
      ) : (
        <>
          <div className={css.imageContainer}>
            <img src={props.user?.avatar ?? defaultAvatar} />
          </div>
          <h3>{props.user?.username}</h3>
          {isInGame ? (
            <p className={css.isReady}>is in-game</p>
          ) : (
            isReady ? (
              <p className={css.isReady}>READY</p>
            ) : (
              <p className={css.isReady}>not ready</p>
            )
          )}
        </>
      )}
    </div>
  );
}