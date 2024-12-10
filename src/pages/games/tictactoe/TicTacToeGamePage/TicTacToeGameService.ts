import axiosInstance from "../../../../interceptors/Axios";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { GameStatus } from "../../../../interfaces/GameStatus";

export const connectToWs = async (
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setGameboard: React.Dispatch<React.SetStateAction<number[][]>>
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
      setGameboard
    ),
    onError
  );
};

export const update = async (
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  setGameboard: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  try {
    const statusResponse = await axiosInstance.get('game/tic-tac-toe/status');
    const gameboardResponse = await axiosInstance.get('game/tic-tac-toe/get-positions');
    console.log(statusResponse);
    
    setGameStatus(statusResponse.data.data);
    setGameboard(gameboardResponse.data);
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
  setGameboard: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  client.subscribe('/topic/game/tic-tac-toe', () => {
    update(
      setGameStatus,
      setGameboard
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

export async function leaveGame(setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>) {
  await axiosInstance.post('game/tic-tac-toe/leave');
}