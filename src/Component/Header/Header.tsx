import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

export default function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes['header-logo']}>
        <h1 className={classes['header-logo_text']}>Realworld Blog</h1>
      </Link>
      <div className={classes['header-btn']}>
        <Link to="/sign-in">
          <button className={classes['header-btn_signin']} type="button">
            Sign In
          </button>
        </Link>
        <Link to="/sign-up">
          <button className={classes['header-btn_signup']} type="button">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}
