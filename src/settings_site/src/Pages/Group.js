import { getUniqueId } from "../common/utils/utils";
import PageManagerStyles from "./PageManager.module.css";

function GroupTypeForm(props) {
    const group_name_id = getUniqueId("name");
    return (
        <fieldset /* Group */>
            <div class={PageManagerStyles.page_manager__form__field}>
                <label htmlFor={group_name_id}>Name</label>
                <input
                    id={group_name_id}
                    class={PageManagerStyles.page_manager__form__field__value}
                    type="text"
                    data-dict-key="name"
                    value={props.data.name || ""}
                    onChange={props.onChange}
                />
            </div>
        </fieldset>
    );
}

function GroupView(props) {
    return (
        <div className={PageManagerStyles.page_manager__rule_list__rule}>
            <span className={PageManagerStyles.page_manager__group__name}>{props.name}</span>
            <div style={{ float: "right" }}>
                <i
                    aria-label="Go"
                    className={["las la-chevron-right", PageManagerStyles.page_manager__bottom__icon_buttons].join(" ")}
                    data-pagename={props.name}
                    onClick={props.onGoButtonClick}
                ></i>
                <i
                    aria-label="Edit"
                    className={["las la-pen", PageManagerStyles.page_manager__bottom__icon_buttons].join(" ")}
                    data-pagename={props.name}
                    onClick={props.onEditButtonClick}
                ></i>
                <i
                    aria-label="Delete"
                    className={["las la-window-close", PageManagerStyles.page_manager__bottom__icon_buttons].join(" ")}
                    data-pagename={props.name}
                    onClick={props.onDeleteButtonClick}
                ></i>
            </div>
        </div>
    );
}

export { GroupTypeForm, GroupView };
