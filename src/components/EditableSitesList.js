import React from "react";
import { ButtonWithIcon } from "./input-elements/ButtonWithIcon";
import EditableSitesListStyles from "../styles/EditableSitesList.module.css";

function EditableSitesList(props) {
    return (
        <div>
            <span>{props.profile.name}</span>
            <div style={{ float: "right" }}>
                <ButtonWithIcon label="Add" code="plus" onClick={props.onAddButton} className={EditableSitesListStyles.page_manager__top__icon_buttons} />
            </div>
            <ul className={EditableSitesListStyles.page_manager__rule_list}>
                {props.profile.sites.map((child, index) => (
                    <li key={index}>
                        <div className={EditableSitesListStyles.page_manager__rule_list__rule}>
                            <span className={EditableSitesListStyles.page_manager__rule__name}>{child.pattern}</span>
                            <span className={EditableSitesListStyles.page_manager__rule__url}>{(child.blocksUrl ? ["URL"] : []).concat(child.blocksTitle ? ["Title"] : []).join(', ')}</span>
                            <div style={{ float: "right" }}>
                                <ButtonWithIcon label="Edit" code="pen" onClick={props.onEditChildButtonClick(child, child.pattern)} className={EditableSitesListStyles.page_manager__bottom__icon_buttons} />
                                <ButtonWithIcon label="Delete" code="window-close" onClick={props.onDeleteChildButtonClick(child.pattern)} className={EditableSitesListStyles.page_manager__bottom__icon_buttons} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { EditableSitesList };