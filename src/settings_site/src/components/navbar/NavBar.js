import NavBarStyles from '../../styles/NavBar.module.css';
import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav className={NavBarStyles.navbar}>
            <ul className={NavBarStyles.navbar__unordered_list}>
                <li class={NavBarStyles.navbar__unordered_list__list_item}><Link to='/pages' className={NavBarStyles.navbar__button}>Pages</Link></li>
                <li class={NavBarStyles.navbar__unordered_list__list_item}><Link to='/settings' className={NavBarStyles.navbar__button}>Settings</Link></li>
            </ul>
        </nav>
    );
}