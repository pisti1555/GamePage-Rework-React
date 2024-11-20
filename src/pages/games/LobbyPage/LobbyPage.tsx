import { useEffect, useState } from 'react';
import css from './LobbyPage.module.css';

import { Lobby } from '../../../interfaces/Lobby';
import LobbyPlayer from './components/Player/LobbyPlayer';
import LobbyChat from './components/Chat/LobbyChat';
import LobbyFriends from './components/Friends/LobbyFriends';
import LobbyControlButtons from './components/ControlButtons/LobbyControlButtons';
import { User } from '../../../interfaces/User';
import LobbyGameSelectPage from './LobbyGameSelectPage';
import Loading from '../../../components/Loading/Loading';
import { getLobby } from '../../../services/LobbyService';

interface Props {
  client: User|undefined
}

export default function LobbyPage(props: Props) {
  const [lobby, setLobby] = useState<Lobby>();
  const [isReady, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const response = await getLobby();
      setLobby(response);

      lobby?.readyMembers.map(member => {
        if (member.id === props.client?.id) setReady(true);
      });

      setLoading(false);
    };

    get();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!lobby) {
    return <LobbyGameSelectPage setLobby={setLobby} />;
  }

  return (
    <div className={css.mainContainer}>
      <section className={css.block}>
        <h2>Lobby</h2>
        {lobby.members.map((member, index) => {
          return lobby.members.length > 1 ? (
            <LobbyPlayer 
              user={member} 
              readyMembers={lobby.readyMembers} 
              isReady={isReady}
              key={'member-' + member.id}
            />
          ) : (
            <>
              <LobbyPlayer 
                user={member} 
                readyMembers={lobby.readyMembers} 
                isReady={isReady}
                key={'member-' + member.id}
              />
              <LobbyPlayer 
                isComputer={true}
                key={'computer-' + index}
              />
            </>
          );
        })}
      </section>

      <section className={css.block}>
        <h2>Friends</h2>
        <LobbyFriends />
      </section>

      <section className={css.block}>
        <h2>Chat</h2>
        <LobbyChat />
      </section>

      <LobbyControlButtons
        client={props.client}
        lobby={lobby}
        isReady={isReady}
        setLobby={setLobby}
      />
    </div>
  );
}