import { getUniqueIdHandler } from "../common/utils/utils";
import PageManagerStyles from "./PageManager.module.css";
import React from "react";

function SettingsTextEntry(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={PageManagerStyles.page_manager__form__field}>
            <label htmlFor={idHandler.get("text-entry")}>{props.label}</label>
            <input
                id={idHandler.get("text-entry")}
                class={PageManagerStyles.page_manager__form__field__value}
                type="text"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export { SettingsTextEntry };