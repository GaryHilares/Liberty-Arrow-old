import { getUniqueId } from "../common/utils/utils";
import PageManagerStyles from "./PageManager.module.css";
import React from "react";

class ByWordType {
    static Form(props) {
        const word_name_id = getUniqueId("name");
        const word_word_id = getUniqueId("word");
        return (
            <fieldset /* Word */>
                <div class={PageManagerStyles.page_manager__form__field}>
                    <label htmlFor={word_name_id}>Name</label>
                    <input
                        id={word_name_id}
                        class={PageManagerStyles.page_manager__form__field__value}
                        type="text"
                        value={props.data.name || ""}
                        onChange={props.onChange("name")}
                    />
                </div>
                <div class={PageManagerStyles.page_manager__form__field}>
                    <label htmlFor={word_word_id}>Word</label>
                    <input
                        id={word_word_id}
                        class={PageManagerStyles.page_manager__form__field__value}
                        type="text"
                        value={props.data.word || ""}
                        onChange={props.onChange("word")}
                    />
                </div>
            </fieldset>
        );
    }

    static View(props) {
        return (
            <div className={PageManagerStyles.page_manager__rule_list__rule}>
                <span className={PageManagerStyles.page_manager__unique__name}>{props.name}</span>
                <span className={PageManagerStyles.page_manager__unique__url}>By word: {props.word}</span>
                <div style={{ float: "right" }}>
                    <i
                        aria-label="Edit"
                        className={`las la-pen ${PageManagerStyles.page_manager__bottom__icon_buttons}`}
                        onClick={props.onEditButtonClick}
                    />
                    <i
                        aria-label="Delete"
                        className={`las la-window-close ${PageManagerStyles.page_manager__bottom__icon_buttons}`}
                        onClick={props.onDeleteButtonClick}
                    />
                </div>
            </div>
        );
    }
}

export { ByWordType };
