import PageManagerStyles from "./PageManager.module.css";
import React from "react";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { SettingsTextEntry } from "./SettingsTextEntry";

class ByUrlType {
    static Form(props) {
        return (
            <fieldset>
                <SettingsTextEntry label="Name" value={props.data.name || ""} onChange={props.onChange("name")} />
                <SettingsTextEntry label="URL" value={props.data.url || ""} onChange={props.onChange("url")} />
            </fieldset>
        );
    }

    static View(props) {
        return (
            <div className={PageManagerStyles.page_manager__rule_list__rule}>
                <span className={PageManagerStyles.page_manager__unique__name}>{props.name}</span>
                <span className={PageManagerStyles.page_manager__unique__url}>URL: {props.url}</span>
                <div style={{ float: "right" }}>
                    <ButtonWithIcon label="Edit" code="pen" onClick={props.onEditButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                    <ButtonWithIcon label="Delete" code="window-close" onClick={props.onDeleteButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                </div>
            </div>
        );
    }
}

export { ByUrlType };
