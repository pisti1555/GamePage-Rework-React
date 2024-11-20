import { useEffect, useState } from 'react';
import css from './LobbyFriends.module.css';
import axiosInstance from '../../../../../interceptors/Axios';
import { User } from '../../../../../interfaces/User';

import defaultAvatar from '../../../../../images/user.jpg';
import { IoPersonAdd } from 'react-icons/io5';
import { inviteFriend } from '../../../../../services/LobbyService';

export default function LobbyFriends() {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await axiosInstance.get('friends');
      const friends = response.data.data;
      setFriends(friends);
    };

    getFriends();
  }, []);

  return (
    <ul className={css.list}>
      {friends.map(friend => {
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