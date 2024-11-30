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
import { useNavigate } from 'react-router-dom';
import { getLobby } from '../../../services/game/LobbyService';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

interface Props {
  client: User|undefined
}

export default function LobbyPage(props: Props) {
  const [stompClient, setStompClient] = useState<any | null>(null);
  const [lobby, setLobby] = useState<Lobby>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const connect = async () => {
    const token = localStorage.getItem('JWToken');
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    
    client.connect(
      { 
        Authorization: 'Bearer ' + token
      },
      () => onConnected(client),
      onError
    );
  };

const handleUpdate = async () => {
  const response: Lobby = await getLobby();
  setLobby(response);
  console.log(response);
};

const onConnected = (client: any) => {
  setStompClient(client);


  client.subscribe('/topic/lobby', () => {
    handleUpdate();
  });

  client.send(
    "/app/socket.newUser",
    {},
    JSON.stringify({
      sender: props.client?.username,
      type: 'NEW_USER',
      time: Date.now(),
    })
  );
};



 
const onError = async (err: any) => {
  console.log(err);
}

useEffect(() => {
  connect();
}, []);


  useEffect(() => {
    const get = async () => {
      try {
        setLoading(true);
        const response:Lobby = await getLobby();
        setLobby(response);
      } catch(e) {
        
      } finally {
        setLoading(false);
      }
    };
    get();
  }, [props.client]);

  if (loading) {
    return <Loading />;
  }

  if (!lobby) {
    return <LobbyGameSelectPage setLobby={setLobby} />;
  }

  if (
    lobby.inGameMembers.some(member =>
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