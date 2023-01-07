import { getUniqueId } from "../common/utils/utils";
import PageManagerStyles from "./PageManager.module.css";
import React from "react";

function UniqueTypeForm(props) {
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
                    data-dict-key="name"
                    value={props.data.name || ""}
                    onChange={props.onChange}
                />
            </div>
            <div class={PageManagerStyles.page_manager__form__field}>
                <label htmlFor={unique_url_id}>URL</label>
                <input
                    id={unique_url_id}
                    class={PageManagerStyles.page_manager__form__field__value}
                    type="text"
                    data-dict-key="url"
                    value={props.data.url || ""}
                    onChange={props.onChange}
                />
            </div>
        </fieldset>
    );
}

function UniqueView(props) {
    return (
        <div className={PageManagerStyles.page_manager__rule_list__rule}>
            <span className={PageManagerStyles.page_manager__unique__name}>{props.name}</span>
            <span className={PageManagerStyles.page_manager__unique__url}>{props.url}</span>
            <div style={{ float: "right" }}>
                <i
                    aria-label="Edit"
                    className={`las la-pen ${PageManagerStyles.page_manager__bottom__icon_buttons}`}
                    data-pagename={props.name}
                    onClick={props.onEditButtonClick}
                />
                <i
                    aria-label="Delete"
                    className={`las la-window-close ${PageManagerStyles.page_manager__bottom__icon_buttons}`}
                    data-pagename={props.name}
                    onClick={props.onDeleteButtonClick}
                />
            </div>
        </div>
    );
}

export { UniqueTypeForm, UniqueView };
