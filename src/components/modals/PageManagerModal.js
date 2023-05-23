import { deepCopy } from "../../utils/utils.js";
import { LabelledTextEntry, LabelledCheckBox, LabelledTimeEntry } from "../input-elements/LabelledInputs.js";
import { Modal } from "./Modal.js";
import PageManagerModalStyles from "../../styles/PageManagerModal.module.css";
import React, { useState } from "react";

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
                if (event.target.checked) {
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
                <h2 class={PageManagerModalStyles.page_manager__form__title}>Create new entry</h2>
                <fieldset>
                    <LabelledCheckBox label="Match site URL" value={"url"} checked={props.data.blocksUrl} onChange={handleChange("type")} />
                    <LabelledCheckBox label="Match site title" value={"title"} checked={props.data.blocksTitle} onChange={handleChange("type")} />
                </fieldset>
                <fieldset>
                    <LabelledTextEntry label="Pattern" value={props.data.pattern || ""} onChange={handleChange("pattern")} />
                </fieldset>
                {validationErrorMessage && (
                    <span class={PageManagerModalStyles.page_manager__form__validation_error_message}>
                        {validationErrorMessage}
                    </span>
                )}
                <fieldset>
                    <LabelledTimeEntry label="Start time" value={props.data.startTime} onChange={handleChange("startTime")} />
                    <LabelledTimeEntry label="End time" value={props.data.endTime} onChange={handleChange("endTime")} />
                </fieldset>
                <div class={PageManagerModalStyles.page_manager__form__buttons_box}>
                    <input type="submit" value="Ok" class={PageManagerModalStyles.page_manager__form__submit_button} />
                    <input type="reset" value="Cancel" class={PageManagerModalStyles.page_manager__form__reset_button} />
                </div>
            </form>
        </Modal>
    );
}

export { PageManagerModal };