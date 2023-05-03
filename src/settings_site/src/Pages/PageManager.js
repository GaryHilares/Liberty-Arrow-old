/* global chrome */
import React, { useEffect, useState } from "react";
import { deepCopy } from "../common/utils/utils";
import { SiteRule } from "./SiteRule";
import { ButtonWithIcon } from "./ButtonWithIcon.js";
import { PageManagerModal } from "./PageManagerModal";
import PageManagerStyles from "./PageManager.module.css";

class Profile {
    constructor(name, sites) {
        if (!name || !sites) {
            throw new Error("PageTree : A value passed to the constructor is invalid");
        }
        this.name = name;
        this.sites = sites;
    }
    getSiteIndex(name) {
        return this.sites
            .map((e) => e.pattern)
            .indexOf(name);
    }
    upsertSite(name, newValue) {
        const index = this.getSiteIndex(name);
        if (index === -1) {
            this.sites.push(newValue);
        } else {
            this.sites[index] = newValue;
        }
    }
    deleteSite(name) {
        const index = this.getSiteIndex(name);
        this.sites.splice(index, 1);
    }

    getDeepCopy() {
        return new Profile(this.name, deepCopy(this.sites));
    }
}

function EditableSitesList(props) {
    return (
        <div>
            <span>{props.profile.name}</span>
            <div style={{ float: "right" }}>
                <ButtonWithIcon label="Add" code="plus" onClick={props.onAddButton} className={PageManagerStyles.page_manager__top__icon_buttons} />
            </div>
            <ul className={PageManagerStyles.page_manager__rule_list}>
                {props.profile.sites.map((child, index) => (
                    <li key={index}>
                        <SiteRule.View
                            site={child}
                            onDeleteButtonClick={props.onDeleteChildButtonClick(child.pattern)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ProfileEditor() {
    // Set state variables
    const [profile, setProfile] = useState(new Profile("Default Profile", []));
    const [modal, setModal] = useState(null);

    // Storage functions
    useEffect(() => {
        console.info("Loading data from storage")
        chrome.storage.local.get("blockedPages", (result) => {
            setProfile(new Profile(result.blockedPages.name, result.blockedPages.sites));
        });
    }, []);
    useEffect(() => {
        console.info("Saving data to storage")
        chrome.storage.local.set(
            { blockedPages: {name: profile.name, sites: profile.sites} }
        );
    }, [profile]);

    // Modal functions
    function openModal () {
        setModal({
            data: { pattern: null, startTime: null, endTime: null, blocksUrl: true, blocksTitle: false },
        });
    }
    function submitModal() {
        const data = modal.data;
        setProfile((prevValue) => {
            let newValue = prevValue.getDeepCopy();
            let name = data.pattern;
            newValue.upsertSite(name, data);
            return newValue;
        });
        setModal(null);
    }
    function cancelModal() {
        setModal(null);
    }
    function updateModalData(newData) {
        setModal((prevModal) => ({
            ...prevModal,
            data: newData
        }));
    }

    // Create/Edit buttons
    function handleAddButtonClick() {
        openModal();
    }

    // Delete buttons
    function handleChildDeleteButtonClick(name) {
        return function () {
            setProfile((prevValue) => {
                let newValue = prevValue.getDeepCopy();
                newValue.deleteSite(name);
                return newValue;
            });
        }
    }
    return (
        <div className={PageManagerStyles.page_manager}>
            {modal && (
                <PageManagerModal
                    onSubmit={submitModal}
                    onCancel={cancelModal}
                    onChange={updateModalData}
                    data={modal.data}
                />
            )}
            <EditableSitesList
                profile={profile}
                onAddButton={handleAddButtonClick}
                onDeleteChildButtonClick={handleChildDeleteButtonClick}
            />
        </div>
    );
}

export { ProfileEditor };
