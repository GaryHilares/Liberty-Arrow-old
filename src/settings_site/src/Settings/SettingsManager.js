/* global chrome */
import React, { useEffect, useState } from "react";
import { getUniqueId } from "../common/utils/utils";
import SettingsManagerStyles from "./SettingsManager.module.css";

function SettingsManager() {
    const [protectionType, setProtectionType] = useState("None");
    const [details, setDetails] = useState({});

    useEffect(() => {
        chrome.storage.local.get("passwordData", (result) => {
            console.info("Data loaded successfully!");
            console.info(result.passwordData);
            setProtectionType(result.passwordData.protectionType);
            setDetails(result.passwordData.details);
        });
    }, []);

    function handleProtectionTypeChange(event) {
        setProtectionType(event.target.value);
        switch (event.target.value) {
            case "None":
                setDetails({});
                break;
            case "Password":
                setDetails({ password: "" });
                break;
            default:
                setDetails({});
                console.error("UnexpectedResult: protectionType is not known.");
        }
    }
    function handlePasswordTextChange(event) {
        setDetails({ password: event.target.value });
    }
    function save() {
        const passwordData = { details: details, protectionType: protectionType };
        console.info("Saving", passwordData);
        chrome.storage.local.set({ passwordData: passwordData });
    }
    if (!["None", "Password"].includes(protectionType)) {
        console.error("UnexpectedResult: protectionType is not known.");
    }
    const password_protection_select_id = getUniqueId("password-protection-select");
    const password_input_id = getUniqueId("password-input-id");
    return (
        <div className={SettingsManagerStyles.settings_manager}>
            <h2 className={SettingsManagerStyles.settings__title}>Password</h2>
            <div className={SettingsManagerStyles.settings__pair}>
                <label htmlFor={password_protection_select_id}>Protection Type</label>
                <select
                    value={protectionType}
                    className={SettingsManagerStyles.settings__pair__value}
                    id={password_protection_select_id}
                    onChange={handleProtectionTypeChange}
                >
                    <option value="None">None</option>
                    <option value="Password">Password</option>
                </select>
            </div>
            {protectionType === "Password" && (
                <div className={SettingsManagerStyles.settings__pair}>
                    <label htmlFor={password_input_id}>Password</label>
                    <input
                        className={SettingsManagerStyles.settings__pair__value}
                        id={password_input_id}
                        type="password"
                        onChange={handlePasswordTextChange}
                        value={details.password}
                    />
                </div>
            )}
            <h2 className={SettingsManagerStyles.settings__title}>Theme</h2>
            <div className={SettingsManagerStyles.settings__pair}>
                <span>Coming soon!</span>
            </div>
            <div className={SettingsManagerStyles.settings__buttons_box}>
                <button className={SettingsManagerStyles.settings__buttons_box__save_button} onClick={save}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default SettingsManager;
