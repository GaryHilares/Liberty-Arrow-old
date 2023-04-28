import { SettingsTextEntry } from "./SettingsTextEntry";
import { ButtonWithIcon } from "./ButtonWithIcon";
import PageManagerStyles from "./PageManager.module.css";
import React from "react";

class SiteRule {
    static Form(props) {
        return (
            <fieldset>
                <SettingsTextEntry label="Pattern" value={props.data.pattern || ""} onChange={props.onChange("pattern")} />
            </fieldset>
        );
    }

    static View(props) {
        return (
            <div className={PageManagerStyles.page_manager__rule_list__rule}>
                <span className={PageManagerStyles.page_manager__unique__name}>{props.site.pattern}</span>
                <span className={PageManagerStyles.page_manager__unique__url}>{(props.site.blocksUrl ? ["URL"] : []).concat(props.site.blocksTitle ? ["Title"] : []).join(', ')}</span>
                <div style={{ float: "right" }}>
                    {/* <ButtonWithIcon label="Edit" code="pen" onClick={props.onEditButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} /> */}
                    <ButtonWithIcon label="Delete" code="window-close" onClick={props.onDeleteButtonClick} className={PageManagerStyles.page_manager__bottom__icon_buttons} />
                </div>
            </div>
        );
    }
}

export { SiteRule };
