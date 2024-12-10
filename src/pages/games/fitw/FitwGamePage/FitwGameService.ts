import axiosInstance from "../../../../interceptors/Axios";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { GameStatus } from "../../../../interfaces/GameStatus";
import { update } from "./components/FitwGameBoard/FitwGameBoardService";

export const connect = async (
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setConnections: React.Dispatch<React.SetStateAction<Map<number, number[]>>>,
  setPositions: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const token = localStorage.getItem('JWToken');
  const socket = new SockJS('http://localhost:8080/ws');
  const client = Stomp.over(socket);
  
  client.connect(
    { 
      Authorization: 'Bearer ' + token
    },
    () => onConnected(
      client, 
      setGameStatus,
      setConnections,
      setPositions
    ),
    onError
  );
};

const handleUpdate = async (
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setConnections: React.Dispatch<React.SetStateAction<Map<number, number[]>>>,
  setPositions: React.Dispatch<React.SetStateAction<number[]>>
) => {
  try {
    const response = await axiosInstance.get('game/fitw/status');
    setGameStatus(response.data.data);
    await update(setConnections, setPositions, setGameStatus);
  } catch (error) {
    setGameStatus({
      winnerPiece: 0,
      inGameMembers: [],
      movesOfMembers: []
    });
  }
};

const onConnected = (
  client: any, 
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setConnections: React.Dispatch<React.SetStateAction<Map<number, number[]>>>,
  setPositions: React.Dispatch<React.SetStateAction<number[]>>
) => {
  client.subscribe('/topic/game/fitw', () => {
    handleUpdate(
      setGameStatus,
      setConnections,
      setPositions
    );
  });

  client.send(
    "/app/socket.newUser",
    {},
    JSON.stringify({
      sender: client.username,
      type: 'NEW_USER',
      time: Date.now(),
    })
  );
};

const onError = async (err: any) => {
  console.log(err);
}

export async function leaveGame() {
  const response = await axiosInstance.post('game/fitw/leave');
}