import React from "react";
import {Link} from "react-router-dom";
import NavBarStyles from './NavBar.module.css';

export function NavBar() {
  return (
    <div className={NavBarStyles.navbar}>
      <Link to='/home' className={NavBarStyles.navbar__button}>Home</Link>
      <Link to='/pages' className={NavBarStyles.navbar__button}>Pages</Link>
      <Link to='/settings' className={NavBarStyles.navbar__button}>Settings</Link>
    </div>);
}