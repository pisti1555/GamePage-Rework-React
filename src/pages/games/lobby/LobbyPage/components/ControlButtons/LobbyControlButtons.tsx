import { Link } from 'react-router-dom';
import css from './LobbyControlButtons.module.css';
import { Lobby } from '../../../../../../interfaces/Lobby';
import { User } from '../../../../../../interfaces/User';
import { useEffect, useState } from 'react';
import { leaveLobby, readyUp, startGame, unready } from './LobbyControlButtonsService';

interface Props {
  client?: User;
  lobby?: Lobby;
}

export default function LobbyControlButtons(props: Props) {
  const [isAllReady, setAllReady] = useState<boolean>(false);
  const [isReady, setReady] = useState<boolean>(false);
  useEffect(() => {
    if (
        props.lobby?.readyMembers.some(member => member.id === props.client?.id)
    )
    {
      setReady(true);
    } else {
      setReady(false);
    }
    if (
      props.lobby?.members.every(member =>
        props.lobby?.readyMembers.some(readyMember => readyMember.id === member.id)
      )
    ) {
      setAllReady(true);
    } else {
      setAllReady(false);
    }
  }, [
    props.lobby
  ]);

  return (
    <div className={css.buttonContainer}>
      <button 
        className={css.mainButton}
        onClick={() => leaveLobby()}
      >Leave Lobby</button>
      {(props.lobby?.members.length ?? 0 > 1) && (
        isReady ? (
          <div>
            <button onClick={() => unready()}>Unready</button>
            {props.client?.id === props.lobby?.members[0].id && (
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
      )}
    </div>
  );
}