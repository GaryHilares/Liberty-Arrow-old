import React from "react";
import { Link } from "react-router-dom";
import NavBarStyles from './NavBar.module.css';

export function NavBar() {
  return (
    <nav className={NavBarStyles.navbar}>
      <img class={NavBarStyles.navbar__logo} alt="logo" src="static/images/wireframe.png" width={"240px"} height={"80px"} />
      <ul className={NavBarStyles.navbar__unordered_list}>
        <li class={NavBarStyles.navbar__unordered_list__list_item}><Link to='/home' className={NavBarStyles.navbar__button}>Home</Link></li>
        <li class={NavBarStyles.navbar__unordered_list__list_item}><Link to='/pages' className={NavBarStyles.navbar__button}>Pages</Link></li>
        <li class={NavBarStyles.navbar__unordered_list__list_item}><Link to='/settings' className={NavBarStyles.navbar__button}>Settings</Link></li>
      </ul>
    </nav>);
}