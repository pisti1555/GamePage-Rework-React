import { Link } from 'react-router-dom';
import css from './LobbyControlButtons.module.css';
import { Lobby } from '../../../../../interfaces/Lobby';
import { User } from '../../../../../interfaces/User';
import { ChangeEvent, useEffect, useState } from 'react';
import { leaveLobby, readyUp, startGame, unready } from '../../../../../services/LobbyService';

interface Props {
  client?: User;
  lobby?: Lobby;
  isReady: boolean;
  setLobby: React.Dispatch<React.SetStateAction<Lobby|undefined>>;
}

export default function LobbyControlButtons(props: Props) {
  const [isAllReady, setAllReady] = useState<boolean>(false);
  useEffect(() => {
    if (
      props.lobby?.members.every(member => 
        props.lobby?.readyMembers.includes(member)
      )
    ) {
      setAllReady(true);
    } else {
      setAllReady(false);
    }
  }, [props.lobby?.members, props.lobby?.readyMembers]);

  return (
    <div className={css.buttonContainer}>
      <button 
        className={css.mainButton}
        onClick={() => leaveLobby(props.setLobby)}
      >Leave Lobby</button>
      {props.lobby?.members.length ?? 0 > 1 ? (
        props.isReady ? (
          <div>
            <button onClick={() => unready()}>Unready</button>
            {props.client?.id === props.lobby?.admin.id && (
              isAllReady ? (
                <button onClick={() => startGame()}>Start game</button>
              ) : (
                <button disabled>Start game</button>
              )
            )}
          </div>
        ) : (
          <button onClick={() => readyUp()}>Ready</button>
        )
      ) : (
        <Link to="/play-against-ai">Play against AI</Link>
      )}
    </div>
  );
}