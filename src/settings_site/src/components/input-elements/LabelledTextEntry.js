import { getUniqueIdHandler } from "../../utils/utils.js";
import LabelledTextEntryStyles from "../../styles/LabelledTextEntry.module.css";
import React from "react";

function LabelledTextEntry(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={LabelledTextEntryStyles.page_manager__form__field}>
            <label htmlFor={idHandler.get("text-entry")}>{props.label}</label>
            <input
                id={idHandler.get("text-entry")}
                class={LabelledTextEntryStyles.page_manager__form__field__value}
                type="text"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export { LabelledTextEntry };