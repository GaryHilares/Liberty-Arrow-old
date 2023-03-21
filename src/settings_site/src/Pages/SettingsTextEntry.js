import { getUniqueId } from "../common/utils/utils";
import PageManagerStyles from "./PageManager.module.css";
import React from "react";

function SettingsTextEntry(props) {
    const unique_id = getUniqueId("text-entry");
    return (
        <div class={PageManagerStyles.page_manager__form__field}>
            <label htmlFor={unique_id}>{props.label}</label>
            <input
                id={unique_id}
                class={PageManagerStyles.page_manager__form__field__value}
                type="text"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export { SettingsTextEntry };