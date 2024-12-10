import axiosInstance from "../../../../../../interceptors/Axios";
import { GameStatus } from "../../../../../../interfaces/GameStatus";

import css from './TicTacToeGameBoard.module.css';

export async function updateStatus() {
  const statusResponse = await axiosInstance.get('game/tic-tac-toe/status');
  console.log('status: ', statusResponse);

  placePieces(statusResponse.data.data.gameBoard);
}

export const move = async (row: number, col: number) => {
  const moveParams = new URLSearchParams();
  moveParams.append('row', row.toString());
  moveParams.append('col', col.toString());

  try {
    await axiosInstance.post('game/tic-tac-toe/move', moveParams);
  } catch (e) {
    
  }
};

export function placePieces(locations:number[][]) {
  console.log('locations', locations);
  
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      const fieldID = document.getElementById(i + '-' + j);
      if (fieldID?.classList.contains('X')) {
        fieldID.classList.remove('X');
      }
      if (fieldID?.classList.contains('O')) {
        fieldID.classList.remove('O');
      }
      if (locations[i][j] === 1) fieldID?.classList.add(css.X);
      if (locations[i][j] === 2) fieldID?.classList.add(css.O);
    }
  }
}