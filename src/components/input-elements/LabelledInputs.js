import { getUniqueIdHandler } from "../../utils/utils.js";
import LabelledInputsStyles from "../../styles/LabelledInputs.module.css";
import React from "react";

function LabelledTextEntry(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={LabelledInputsStyles.page_manager__form__field}>
            <label htmlFor={idHandler.get("text-entry")}>{props.label}</label>
            <input
                id={idHandler.get("text-entry")}
                class={LabelledInputsStyles.page_manager__form__field__value}
                type="text"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

function LabelledCheckBox(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={LabelledInputsStyles.page_manager__form__field}>
            <label htmlFor={idHandler.get("checkbox")}>{props.label}</label>
            <input
                id={idHandler.get("checkbox")}
                class={LabelledInputsStyles.page_manager__form__field__value}
                name="type"
                type="checkbox"
                value={props.value}
                onChange={props.onChange}
                checked={props.checked}
            />
        </div>
    );
}

function LabelledTimeEntry(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={LabelledInputsStyles.page_manager__form__field}>
            <label htmlFor={idHandler.get("date-entry")}>{props.label}</label>
            <input
                id={idHandler.get("date-entry")}
                class={LabelledInputsStyles.page_manager__form__field__value}
                name="type"
                type="time"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export { LabelledTextEntry, LabelledCheckBox, LabelledTimeEntry };