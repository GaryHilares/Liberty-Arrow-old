import PageManagerStyles from "./PageManager.module.css";
import React from 'react';
import { ButtonWithIcon } from "./ButtonWithIcon.js";
import { SettingsTextEntry } from "./SettingsTextEntry";

class GroupType {
    static Form(props) {
        return (
            <fieldset>
                <SettingsTextEntry label="Name" value={props.data.name || ""} onChange={props.onChange("name")} />
            </fieldset>
        );
    }

    static View(props) {
        return (
            <div className={PageManagerStyles.page_manager__rule_list__rule}>
                <span className={PageManagerStyles.page_manager__group__name}>{props.name}</span>
                <div style={{ float: "right" }}>
                    <ButtonWithIcon label="Go" code="chevron-right" onClick={props.onGoButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                    <ButtonWithIcon label="Edit" code="pen" onClick={props.onEditButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                    <ButtonWithIcon label="Delete" code="window-close" onClick={props.onDeleteButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                </div>
            </div>
        );
    }
}

export { GroupType };
