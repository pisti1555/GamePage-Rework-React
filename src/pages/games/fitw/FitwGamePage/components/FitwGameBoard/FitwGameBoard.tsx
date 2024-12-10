import { useEffect, useRef, useState } from 'react';
import css from './FitwGameBoard.module.css';

import fly from '../../../../../../images/game/fitw/fly.png';
import spider from '../../../../../../images/game/fitw/spider.png';
import { fieldPositions, move } from './FitwGameBoardService';

interface Props {
  piecePositions: number[];
  connectionMap: Map<number, number[]>;
}
export default function FitwGameBoard(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fieldSelected, setFieldSelected] = useState<number|undefined>(undefined);
  const [connectionMap, setConnectionMap] = useState<Map<number, number[]>>(new Map());
  const [piecePositions, setPiecePositions] = useState<number[]>([]);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        Object.entries(connectionMap).forEach(([from, toArray]) => {
          toArray.forEach((to: number) => {
            const fromId = 'field' + from;
            const toId = 'field' + to;
            const fieldFrom = document.getElementById(fromId);
            const fieldTo = document.getElementById(toId);

            if (fieldFrom && fieldTo) {
              const x1 = fieldFrom.offsetLeft;
              const y1 = fieldFrom.offsetTop;
              const x2 = fieldTo.offsetLeft;
              const y2 = fieldTo.offsetTop;

              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          });
        });
      }
    }
  }, [connectionMap]);

  useEffect(() => {
    setConnectionMap(props.connectionMap);
    setPiecePositions(props.piecePositions);
  }, [props.connectionMap, props.piecePositions]);

  return (
    <div className={css.gameBoard}>
      <canvas ref={canvas} width="700" height="700" className={css.canvas}></canvas>
      {Array.from({ length: 28 }).map((_, i) => {
          const id = 'field' + i;
          return (
            <div
              key={i}
              className={
                i === 0 || i === 5 || i === 10 || 
                i === 14 || i === 18 || i === 22 || 
                i === 27 ? css.field : css.subfield
              }
              onClick={() => move(i, setFieldSelected, fieldSelected)}
              id={id}
              style={{
                position: 'absolute',
                top: fieldPositions[i].top,
                left: fieldPositions[i].left
              }}
            >
              {i === piecePositions[0] && (
                <img src={fly} alt="Fly" className={css.piece} />
              )}
              {i !== piecePositions[0] && piecePositions?.includes(i) && (
                <img src={spider} alt="Spider" className={css.piece} />
              )}
            </div>
          );
        })}
    </div>
  );
}