import { getUniqueId } from "../common/utils/utils";
import PageManagerStyles from "./PageManager.module.css";
import React from "react";
import { ButtonWithIcon } from "./ButtonWithIcon";

class ByUrlType {
    static Form(props) {
        const unique_name_id = getUniqueId("name");
        const unique_url_id = getUniqueId("url");
        return (
            <fieldset /* Unique */>
                <div class={PageManagerStyles.page_manager__form__field}>
                    <label htmlFor={unique_name_id}>Name</label>
                    <input
                        id={unique_name_id}
                        class={PageManagerStyles.page_manager__form__field__value}
                        type="text"
                        value={props.data.name || ""}
                        onChange={props.onChange("name")}
                    />
                </div>
                <div class={PageManagerStyles.page_manager__form__field}>
                    <label htmlFor={unique_url_id}>URL</label>
                    <input
                        id={unique_url_id}
                        class={PageManagerStyles.page_manager__form__field__value}
                        type="text"
                        value={props.data.url || ""}
                        onChange={props.onChange("url")}
                    />
                </div>
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
