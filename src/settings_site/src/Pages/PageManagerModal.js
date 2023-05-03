import React, { useState } from "react";
import { deepCopy, getUniqueIdHandler } from "../common/utils/utils";
import { SiteRule } from "./SiteRule";
import { Modal } from "../common/components/modals/Modal";
import PageManagerStyles from "./PageManager.module.css";

function TimeEntry(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={PageManagerStyles.page_manager__form__field}>
            <label htmlFor={idHandler.get("date-entry")}>{props.label}</label>
            <input
                id={idHandler.get("date-entry")}
                class={PageManagerStyles.page_manager__form__field__value}
                name="type"
                type="time"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

function CheckBox(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={PageManagerStyles.page_manager__form__field}>
            <label htmlFor={idHandler.get("checkbox")}>{props.label}</label>
            <input
                id={idHandler.get("checkbox")}
                class={PageManagerStyles.page_manager__form__field__value}
                name="type"
                type="checkbox"
                value={props.value}
                onChange={props.onChange}
                checked={props.checked}
            />
        </div>
    );
}

function AdvancedSettingsForm(props) {
    return (
        <fieldset>
            <TimeEntry label="Start time" value={props.data.startTime} onChange={props.onChange("startTime")} />
            <TimeEntry label="End time" value={props.data.endTime} onChange={props.onChange("endTime")} />
        </fieldset>
    );
}

function PageManagerModal(props) {
    const [validationErrorMessage, setValidationErrorMessage] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            (!props.data.blocksUrl && !props.data.blocksTitle) || !props.data.pattern
        ) {
            setValidationErrorMessage("Invalid data!");
        } else {
            props.onSubmit();
        }
    }
    const handleCancel = (event) => {
        event.preventDefault();
        props.onCancel();
    }
    const handleChange = (dictKey) => {
        return function (event) {
            let newData = deepCopy(props.data);
            const val = event.target.value;
            if (dictKey === "type") {
                if(event.target.checked) {
                    if (val === "url") {
                        newData.blocksUrl = true;
                    } else if (val === "title") {
                        newData.blocksTitle = true;
                    }
                } else {
                    if (val === "url") {
                        newData.blocksUrl = false;
                    } else if (val === "title") {
                        newData.blocksTitle = false;
                    }
                }
            } else if (Object.keys(newData).includes(dictKey)) {
                newData[dictKey] = val;
            } else {
                console.error("UnexpectedResult: dictKey is not known.");
            }
            props.onChange(newData);
        }
    }
    return (
        <Modal>
            <form onSubmit={handleSubmit} onReset={handleCancel}>
                <h2 class={PageManagerStyles.page_manager__form__title}>Create new entry</h2>
                <fieldset>
                    <CheckBox label="Match site URL" value={"url"} checked={props.data.blocksUrl} onChange={handleChange("type")} />
                    <CheckBox label="Match site title" value={"title"} checked={props.data.blocksTitle} onChange={handleChange("type")} />
                </fieldset>
                <SiteRule.Form onChange={handleChange} data={props.data} />
                {validationErrorMessage && (
                    <span class={PageManagerStyles.page_manager__form__validation_error_message}>
                        {validationErrorMessage}
                    </span>
                )}
                <AdvancedSettingsForm onChange={handleChange} data={props.data} />
                <div class={PageManagerStyles.page_manager__form__buttons_box}>
                    <input type="submit" value="Ok" class={PageManagerStyles.page_manager__form__submit_button} />
                    <input type="reset" value="Cancel" class={PageManagerStyles.page_manager__form__reset_button} />
                </div>
            </form>
        </Modal>
    );
}

export {PageManagerModal};