import { useEffect, useState } from 'react';
import css from './ShowUser.module.css';
import { Link, useParams } from 'react-router-dom';
import { User } from '../../../interfaces/User';
import { getFriendsOfUser, getUserByUsername } from '../../../services/UserService';

import defaultAvatar from '../../../images/user.jpg';
import { Game } from '../../../interfaces/Game';
import { getAllGames, getGameStatsOfUser } from '../../../services/GameService';
import { GameStats } from '../../../interfaces/GameStats';
import Loading from '../../../components/Loading/Loading';

interface Props {
  user?: User
}

export default function ShowUser(
  props: Props
) {
  const { username } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [friends, setFriends] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [gameStats, setGameStats] = useState<GameStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getUserByUsername(username);
        setUser(user);
        const friends = await getFriendsOfUser(username);
        setFriends(friends);
        const games = await getAllGames();
        setGames(games);
        const fitw = await getGameStatsOfUser('fly-in-the-web', username);
        const tictactoe = await getGameStatsOfUser('tic-tac-toe', username);
        const stats: GameStats[] = [fitw, tictactoe];
        setGameStats(stats);
        setLoading(false);
      } catch (e) {
        setUser(undefined);
        setFriends([]);
        setGames([]);
        setGameStats([]);
      }
    };

    fetchData();    
  }, [username]);

  if (loading) return <Loading />;

  return (
    <div className={css.mainContainer}>
      <section className={css.header}>
        <div className={css.imageContainer}>
          <img src={user?.avatar ?? defaultAvatar} />
        </div>
        <div className={css.playerIntroduction}>
          <h1 className={css.profileName}>{user?.username}</h1>
          <p className={css.profileDescription}>{user?.description}</p>
        </div>
        {(props.user && username !== props.user.username) && (
          <div className={css.invitation}>

          </div>
        )}
      </section>

      <section className={css.profileContent}>
        <section className={css.playerGameData}>
          {gameStats.map(stat => {
            return (
              <div className={css.game}>
                {games.map(g => {
                  if (g.id === stat.gameId) {
                    return (
                      <>
                        <div className={css.imageContainer}>
                          <img src={g.thumbnailUrl} alt={g.name} />
                        </div>
                        <div className={css.gameData}>
                          <h2>{g.name}</h2>
                          <h3>Games played: {stat.played}</h3>
                          <h3>Games won: {stat.won}</h3>
                          <h3>Moves done: {stat.moves}</h3>          
                        </div>
                      </>
                    );
                  } else return null;
                })}
            </div>
            );
          })}

        </section>

        <section className={css.friendContainer}>
          <ul className={css.friendList}>
            <h3>Friends</h3>
            <p>total: {friends.length}</p>
            {friends.length === 0 && (
              <li>Friendlist is empty</li>
            )}
            {friends.map(friend => {
              return (
                <li>
                    <Link to={'/user/' + friend.username} className={css.item}>
                        <div className={css.imageContainer}>
                            <img src={friend.avatar ?? defaultAvatar} />
                        </div>
                        <span>{friend.username}</span>
                    </Link>
                </li>
              );
            })}
          </ul>
        </section>

      </section>
    </div>
  );
}