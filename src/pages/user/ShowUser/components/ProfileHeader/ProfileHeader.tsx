import css from './ProfileHeader.module.css';
import defaultAvatar from '../../../../../images/user.jpg';
import { User } from '../../../../../interfaces/User';

export default function ProfileHeader({username, user}: {username: string|undefined, user: User|undefined}) {
  return (
    <section className={css.header}>
      <div className={css.imageContainer}>
        <img src={user?.avatar ?? defaultAvatar} />
      </div>
      <div className={css.playerIntroduction}>
        <h1 className={css.profileName}>{user?.username}</h1>
        <p className={css.profileDescription}>{user?.description}</p>
      </div>
      {(user && username !== user.username) && (
        <div className={css.invitation}>

        </div>
      )}
    </section>
  );
}