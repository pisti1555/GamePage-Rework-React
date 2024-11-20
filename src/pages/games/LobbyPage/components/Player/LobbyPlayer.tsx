import css from './LobbyPlayer.module.css';

import defaultAvatar from '../../../../../images/user.jpg';
import { User } from '../../../../../interfaces/User';
import { FaLaptop } from 'react-icons/fa';

interface Props {
  user?: User;
  readyMembers?: User[];
  isReady?: boolean;
  isComputer?: boolean;
}

export default function LobbyPlayer(props: Props) {
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
          {props.isReady ? (
            <p className={css.isReady}>Ready</p>
          ) : (
            <p className={css.isReady}>Not ready</p>
          )}
        </>
      )}
    </div>
  );
}