import { useEffect, useState } from 'react';
import css from './FitwGamePage.module.css';
import FitwGameBoard from './FitwGameBoard/FitwGameBoard';
import FitwGameOver from './FitwGameOver/FitwGameOver';
import axiosInstance from '../../../../interceptors/Axios';
import { GameStatus } from '../../../../interfaces/GameStatus';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../interfaces/User';
import { getLobby, leaveLobby } from '../../../../services/game/LobbyService';
import { Lobby } from '../../../../interfaces/Lobby';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { loadBoard } from './FitwGameBoard/FitwGameBoardService';

interface Props {
  client: User|undefined;
}

export default function FitwGamePage(props: Props) {
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState<any | null>(null);
  const [connectionMap, setConnectionMap] = useState<Map<number, number[]>>(new Map());
  const [piecePositions, setPiecePositions] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    winnerPiece: 0,
    inGameMembers: [],
    movesOfMembers: []
  });

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
  const response = await axiosInstance.get('game/fitw/status');
  setGameStatus(response.data.data);
  await loadBoard(setConnectionMap, setPiecePositions);
};

const onConnected = (client: any) => {
  setStompClient(client);


  client.subscribe('/topic/game/fitw', () => {
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
    const getGameStatus = async () => {
      try {
        await loadBoard(setConnectionMap, setPiecePositions);
        const response = await axiosInstance.get('game/fitw/status');
        setGameStatus(response.data.data);
        if (
          !response.data.data.inGameMembers.some((member: { id: number | undefined; }) =>
            props.client?.id === member.id
          )
        ) {
          navigate('/lobby');
        }
        
      } catch (e) {
        navigate('/lobby');
      }
    };
  
    
    getGameStatus();
  }, []);

  if (gameStatus.winnerPiece !== 0) {
    return <FitwGameOver stats={gameStatus} />;
  }
 
  return (
    <div className={css.page}>
      <button onClick={() => leaveLobby()} className={css.backButton}>Leave game</button>
      <FitwGameBoard connectionMap={connectionMap} piecePositions={piecePositions} />
    </div>
  );
}