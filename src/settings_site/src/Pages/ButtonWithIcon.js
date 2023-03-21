import React from "react";
import PageManagerStyles from "./PageManager.module.css";

function ButtonWithIcon(props) {
    return (
        <i
            aria-label={props.label}
            className={`las la-${props.code} ${PageManagerStyles.page_manager__top__icon_buttons}`}
            onClick={props.onClick}
        ></i>
    );
}

export { ButtonWithIcon };