import { useEffect, useState } from 'react';
import css from './ShowUser.module.css';
import { useParams } from 'react-router-dom';
import { User } from '../../../interfaces/User';

import { Game } from '../../../interfaces/Game';
import { GameStats } from '../../../interfaces/GameStats';
import Loading from '../../../components/Loading/Loading';
import { loadProfile } from './ShowUserService';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileGameStats from './components/ProfileGameStats/ProfileGameStats';
import ProfileFriends from './components/ProfileFriends/ProfileFriends';

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
    const load = async () => {
      await loadProfile(
        username,
        setLoading,
        setUser,
        setFriends,
        setGames,
        setGameStats
      );
    };

    load();    
  }, [username]);

  if (loading) return <Loading />;

  return (
    <div className={css.mainContainer}>
      <ProfileHeader username={username} user={user} />
      <section className={css.profileContent}>
        <ProfileGameStats games={games} gameStats={gameStats} />
        <ProfileFriends friends={friends} />
      </section>
    </div>
  );
}