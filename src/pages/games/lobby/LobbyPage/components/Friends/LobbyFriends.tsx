import { useEffect, useState } from 'react';
import css from './LobbyFriends.module.css';
import { User } from '../../../../../../interfaces/User';

import defaultAvatar from '../../../../../../images/user.jpg';
import { IoPersonAdd } from 'react-icons/io5';
import { inviteFriend } from './LobbyFriendsService';
import { getFriends } from '../../../../../../services/UserService';

interface Props {
  maxPlayers: number;
  members: User[];
}

export default function LobbyFriends(props: Props) {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await getFriends();
      setFriends(friends);
    };

    fetchFriends();
  }, []);

  if (props.members.length === props.maxPlayers) {
    return (
      <h3>Lobby is full</h3>
    );
  }

  return (
    <ul className={css.list}>
      {friends.map(friend => {
        if (props.members.includes(friend)) {
          return null;
        }

        return (
          <li key={'friend'+friend.id}>
            <div className={css.imageContainer}>
              <img src={friend.avatar ?? defaultAvatar} alt={friend.username} />
            </div>
            <h3>{friend.username}</h3>
            <IoPersonAdd 
              onClick={() => inviteFriend(friend.username)}
            />
          </li>
        );
      })}
    </ul>
  );
}