import React from "react";

function ButtonWithIcon(props) {
    return (
        <i
            role="button"
            aria-label={props.label}
            className={`las la-${props.code} ${props.className}`}
            onClick={props.onClick}
        ></i>
    );
}

export { ButtonWithIcon };