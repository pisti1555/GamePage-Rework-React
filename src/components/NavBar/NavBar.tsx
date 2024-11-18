import { Link, useLocation } from 'react-router-dom';
import css from './NavBar.module.css';

import { FaUser } from 'react-icons/fa';
import { User } from '../../interfaces/User';

import defaultAvatar from '../../images/user.jpg';

interface NavBarProps {
  user?: User
  logout: any
}

export default function NavBar (
  props: NavBarProps
) {
  const location  = useLocation();
  const activeLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={css.navBar}>
      <Link to='/' className={css.homeLink}>GamePage-Rework</Link>
      <div className={css.navItems}>
        <Link to='/' className={activeLink('/') ? css.navButtonActive : css.navButton}>Games</Link>
        <Link to='/lobby' className={activeLink('/lobby') ? css.navButtonActive : css.navButton}>Lobby</Link>
      </div>
      <div className={css.navUser}>
        {props.user ? (
          <>
            <div className={css.imageContainer}>
              <img src={props.user.avatar ?? defaultAvatar} alt={props.user.username} />
            </div>
            <div className={css.navUserDropdown}>
              <div className={css.dropdownUserData}>
                <div className={css.dropdownImageContainer}>
                  <img src={props.user.avatar ?? defaultAvatar} alt={props.user.username} />
                </div>
                <p>{props.user.username}</p>
              </div>
              <Link to='/friends' className={css.dropdownItem}>Friends</Link>
              <Link to='' onClick={props.logout} className={css.dropdownItem}>Logout</Link>
            </div>
          </>
        ) : (
          <Link to='/login' className={css.navProfileButton}>Login</Link>
        )}

      </div>

    </nav>
  );
}