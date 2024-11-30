import axiosInstance from "../../../../../interceptors/Axios";
import { Lobby } from "../../../../../interfaces/Lobby";

export const fieldPositions = [
  { top: '50%', left: '10%' },  // 0
  { top: '50%', left: '19%' },  // 1
  { top: '50%', left: '27%' },  // 2
  { top: '50%', left: '34%' },  // 3
  { top: '50%', left: '41%' },  // 4
  { top: '10%', left: '33%' },  // 5
  { top: '19%', left: '37%' },  // 6
  { top: '27%', left: '40%' },  // 7
  { top: '34%', left: '43%' },  // 8
  { top: '41%', left: '46%' },  // 9
  { top: '10%', left: '66%' },  // 10
  { top: '21%', left: '62%' },  // 11
  { top: '30%', left: '58%' },  // 12
  { top: '40%', left: '54%' },  // 13
  { top: '50%', left: '90%' },  // 14
  { top: '50%', left: '80%' },  // 15
  { top: '50%', left: '70%' },  // 16
  { top: '50%', left: '60%' },  // 17
  { top: '90%', left: '66%' },  // 18
  { top: '80%', left: '62%' },  // 19
  { top: '70%', left: '58%' },  // 20
  { top: '60%', left: '54%' },  // 21
  { top: '90%', left: '33%' },  // 22
  { top: '81%', left: '37%' },  // 23
  { top: '73%', left: '40%' },  // 24
  { top: '66%', left: '43%' },  // 25
  { top: '59%', left: '46%' },  // 26
  { top: '50%', left: '50%' },  // 27
];

export const loadBoard = async (
  setConnections: React.Dispatch<React.SetStateAction<Map<number, number[]>>>, 
  setPositions: React.Dispatch<React.SetStateAction<number[]>>
) => {
  try {
    const responseConnections = await axiosInstance.get('game/fitw/get-connections');
    const connections = responseConnections.data;
  
    const responsePositions = await axiosInstance.get('game/fitw/get-positions');
    const positions = responsePositions.data;
  
    setConnections(connections);
    setPositions(positions);
  } catch (error) {
    window.location.href='/lobby';
  }
};

export const move = async (
  field: number, 
  setFieldSelected: React.Dispatch<React.SetStateAction<number | undefined>>,
  fieldSelected?: number,
) => {
  if (!fieldSelected) {
    setFieldSelected(field);
    return;
  }

  const moveParams = new URLSearchParams();
  moveParams.append('from', fieldSelected.toString());
  moveParams.append('to', field.toString());

  const response = await axiosInstance.post('/game/fitw/move', moveParams);
  setFieldSelected(undefined);
};
