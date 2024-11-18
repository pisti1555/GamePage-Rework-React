import { useEffect, useState } from 'react';
import css from './FitwScoreboardPage.module.css';
import axiosInstance from '../../../../interceptors/Axios';
import { GameStats } from '../../../../interfaces/GameStats';
import { Link } from 'react-router-dom';

export default function FitwScoreboardPage() {
  const [stats, setStats] = useState<GameStats[]>([]);

  useEffect(() => {
    const getAllStats = async () => {
      const response = await axiosInstance.get('games/stats/fly-in-the-web');
      const stats = response.data.data;
      setStats(stats);
    };

    getAllStats();
  }, []);

  return (
    <div className={css.mainContainer}>
        <h2 className={css.title}>Scoreboard</h2>
        <table className={css.table}>
            <thead>
                <tr>
                    <th></th>
                    <th>Username</th>
                    <th>Games played</th>
                    <th>Steps made</th>
                    <th>Games won</th>
                </tr>
            </thead>
            <tbody>
              {stats.map(row => {
                return (
                  <tr>
                    <td className={css.imageContainer}>
                        
                    </td>
                    <td>
                      <Link to={'/user/' + row.username}>{row.username}</Link>
                    </td>
                    <td>{row.played}</td>
                    <td>{row.moves}</td>
                    <td>{row.won}</td>
                  </tr>
                );
              })}
            </tbody>
        </table>
    </div>
  );
}