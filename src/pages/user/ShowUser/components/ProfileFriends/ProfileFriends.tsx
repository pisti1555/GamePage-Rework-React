import { Link } from 'react-router-dom';
import css from './ProfileFriends.module.css';

import defaultAvatar from '../../../../../images/user.jpg';
import { User } from '../../../../../interfaces/User';

export default function ProfileFriends({friends}: {friends: User[]}) {
  return (
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
  );
}