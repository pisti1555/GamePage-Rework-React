import { useEffect, useState } from 'react';
import css from './LobbyPage.module.css';

import { Lobby } from '../../../../interfaces/Lobby';
import LobbyPlayer from './components/Player/LobbyPlayer';
import LobbyChat from './components/Chat/LobbyChat';
import LobbyFriends from './components/Friends/LobbyFriends';
import LobbyControlButtons from './components/ControlButtons/LobbyControlButtons';
import { User } from '../../../../interfaces/User';
import Loading from '../../../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { connect, getLobby } from './LobbyService';
import LobbyGameSelectPage from '../LobbyGameSelectPage/LobbyGameSelectPage';

interface Props {
  client: User|undefined
}

export default function LobbyPage(props: Props) {
  const [lobby, setLobby] = useState<Lobby>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await connect(setLobby);
      await getLobby(setLobby);
    };
    init();
  }, [props.client]);
  useEffect(() => {
    if (
      lobby?.inGameMembers.some(member =>
        props.client?.id === member.id
      )
    ) {
      if (lobby.gameName === "Fly in the web") {
        navigate('/fly-in-the-web/play');
      }
      if (lobby.gameName === "TicTacToe") {
        navigate('/tic-tac-toe/play');
      }
    }
  }, [lobby?.inGameMembers, lobby?.gameName]);

  if (loading) {
    return <Loading />;
  }

  if (!lobby) {
    return <LobbyGameSelectPage setLobby={setLobby} />;
  }

  return (
    <div className={css.mainContainer}>
      <section className={css.block}>
        <h2>Lobby - {lobby.gameName}</h2>
        {lobby.members.map((member, index) => {
          return lobby.members.length > 1 ? (
            <LobbyPlayer 
              user={member} 
              lobby={lobby}
              key={'member-' + member.id}
            />
          ) : (
            <>
              <LobbyPlayer 
                user={member} 
                lobby={lobby}
                key={'member-' + member.id}
              />
              <LobbyPlayer 
                isComputer={true}
                lobby={lobby}
                key={'computer-' + index}
              />
            </>
          );
        })}
      </section>

      <section className={css.block}>
        <h2>Friends</h2>
        <LobbyFriends maxPlayers={lobby.maxPlayers} members={lobby.members} />
      </section>

      <section className={css.block}>
        <h2>Chat</h2>
        <LobbyChat />
      </section>

      <LobbyControlButtons
        client={props.client}
        lobby={lobby}
      />
    </div>
  );
}