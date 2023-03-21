import { SettingsTextEntry } from "./SettingsTextEntry.js";
import { ButtonWithIcon } from "./ButtonWithIcon.js";
import PageManagerStyles from "./PageManager.module.css";
import React from "react";

class ByWordType {
    static Form(props) {
        return (
            <fieldset>
                <SettingsTextEntry label="Name" value={props.data.name || ""} onChange={props.onChange("name")} />
                <SettingsTextEntry label="Word" value={props.data.url || ""} onChange={props.onChange("word")} />
            </fieldset >
        );
    }

    static View(props) {
        return (
            <div className={PageManagerStyles.page_manager__rule_list__rule}>
                <span className={PageManagerStyles.page_manager__unique__name}>{props.name}</span>
                <span className={PageManagerStyles.page_manager__unique__url}>By word: {props.word}</span>
                <div style={{ float: "right" }}>
                    <ButtonWithIcon label="Edit" code="pen" onClick={props.onEditButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                    <ButtonWithIcon label="Delete" code="window-close" onClick={props.onDeleteButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                </div>
            </div>
        );
    }
}

export { ByWordType };
