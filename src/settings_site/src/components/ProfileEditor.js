/* global chrome */
import { EditableSitesList } from "./EditableSitesList.js";
import { PageManagerModal } from "./modals/PageManagerModal.js";
import { Profile } from "../utils/Profile.js";
import PageManagerStyles from "../styles/PageManager.module.css";
import React, { useEffect, useState } from "react";

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
            { blockedPages: { name: profile.name, sites: profile.sites } }
        );
    }, [profile]);

    // Modal functions
    function openModal() {
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
