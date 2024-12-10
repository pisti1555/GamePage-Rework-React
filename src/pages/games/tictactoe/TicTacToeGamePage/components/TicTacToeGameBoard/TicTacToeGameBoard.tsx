import { useEffect, useState } from 'react';
import css from './TicTacToeGameBoard.module.css';
import { GameStatus } from '../../../../../../interfaces/GameStatus';
import { move, placePieces } from './TicTacToeGameBoardService';

interface Props {
  gameStatus: GameStatus;
  gameboard: number[][];
}

export default function TicTacToeGameBoard(props: Props) {
  const [mainPlayersTurn, setMainPlayersTurn] = useState<boolean>(true);

  useEffect(() => {
    placePieces(props.gameboard);
  }, [props.gameboard]);

  return (
    <div className={css.boardContainer}>
      <div className={css.gameBoard}>
        {props.gameboard.map((row, rowIndex) => (
          <div key={rowIndex} className={css.row}>
            {row.map((field, colIndex) => (
              <div
                key={rowIndex + '-' + colIndex}
                className={
                  field === 1
                    ? css.fieldX
                    : field === 2
                    ? css.fieldO
                    : css.fieldEmpty
                }
                onClick={() => field === 0 && move(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}