import { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/Axios";
import { User } from "../../interfaces/User";

import defaultAvatar from '../../images/user.jpg';

import css from './Friends.module.css';
import { Link } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get('friends');
        setFriends(response.data.data);
      } catch (e) {
        
      }
    }

    fetchFriends();
  }, []);

  const updateUserSearchList = () => {

  };

  return (
    <div className={css.mainContainer}>
        <section className={css.friendlistSection}>
          <h2 className={css.title}>Friend list</h2>
          <p>Total: {friends.length}</p>
          <ul className={css.friendList}>
            {friends.length > 0 ? (
              friends.map(friend => {
                return (
                  <li>
                    <Link to={'/user/' + friend.username}>
                      <div className={css.imageContainer}>
                        <img src={friend.avatar ?? defaultAvatar} />
                      </div>
                      <span>{friend.username}</span>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>You do not have any friends</li>
            )}
          </ul>
        </section>

        <section className={css.searchSection}>
          <div className={css.head}>
            <h2>Find new friends</h2>
            <div className={css.search}>
              <input type="text" placeholder="search by username..." onChange={updateUserSearchList} />
            </div>
          </div>
          <ul>
            
          </ul>
        </section>
    </div>
  );
}