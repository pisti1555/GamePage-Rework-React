import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { Lobby } from "../../../../interfaces/Lobby";
import axiosInstance from '../../../../interceptors/Axios';

export const connect = async (setLobby: React.Dispatch<React.SetStateAction<Lobby | undefined>>) => {
  const token = localStorage.getItem('JWToken');
  const socket = new SockJS('http://localhost:8080/ws');
  const client = Stomp.over(socket);
  
  client.connect(
    { 
      Authorization: 'Bearer ' + token
    },
    () => onConnected(client, setLobby),
    onError
  );
};

const handleUpdate = async (setLobby: React.Dispatch<React.SetStateAction<Lobby | undefined>>) => {
  await getLobby(setLobby);
};

const onConnected = (client: any, setLobby: React.Dispatch<React.SetStateAction<Lobby | undefined>>) => {
  client.subscribe('/topic/lobby', () => {
    handleUpdate(setLobby);
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

export async function getLobby(setLobby: React.Dispatch<React.SetStateAction<Lobby | undefined>>) {
  try {
    const response = await axiosInstance.get('lobby');
    if (response) {
      const lobby = response.data.data;
      setLobby(lobby);
    }
  } catch (e) {
    setLobby(undefined);
  }
}