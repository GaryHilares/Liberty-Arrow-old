/* global chrome */
import React, { useEffect, useState } from "react";
import { getUniqueId } from "../common/utils/utils";
import SettingsManagerStyles from "./SettingsManager.module.css";

function SettingsManager() {
    const [protectionType, setProtectionType] = useState("None");
    const [details, setDetails] = useState({});
    const [theme, setTheme] = useState("default");

    useEffect(() => {
        chrome.storage.local.get("passwordData", (result) => {
            console.info("Data loaded successfully!");
            console.info(result.passwordData);
            setProtectionType(result.passwordData.protectionType);
            setDetails(result.passwordData.details);
        });
    }, []);
    useEffect(() => {
        const passwordData = { details: details, protectionType: protectionType };
        console.info("Saving", passwordData);
        chrome.storage.local.set({ passwordData: passwordData, theme: theme });
    }, [details, protectionType, theme]);

    function handleProtectionTypeChange(event) {
        setProtectionType(event.target.value);
        switch (event.target.value) {
            case "None":
                setDetails({});
                break;
            case "Password":
                setDetails({ password: "" });
                break;
            case "PIN":
                setDetails({ email: "" });
                break;
            default:
                setDetails({});
                console.error("UnexpectedResult: protectionType is not known.");
        }
    }
    function handlePasswordTextChange(event) {
        setDetails({ password: event.target.value });
    }
    function handlePinEmailTextChange(event) {
        setDetails({ email: event.target.value });
    }
    function handleThemeChange(event) {
        setTheme(event.target.value);
    }
    if (!["None", "Password", "PIN"].includes(protectionType)) {
        console.error("UnexpectedResult: protectionType is not known.");
    }
    const password_protection_select_id = getUniqueId("password-protection-select");
    const password_input_id = getUniqueId("password-input-id");
    const pin_email_input_id = getUniqueId("pin-email-input-id");
    const theme_input_id = getUniqueId("theme-input-id");
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
                    <option value="PIN">PIN</option>
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
            {protectionType === "PIN" && (
                <div className={SettingsManagerStyles.settings__pair}>
                    <label htmlFor={pin_email_input_id}>Email</label>
                    <input
                        className={SettingsManagerStyles.settings__pair__value}
                        id={pin_email_input_id}
                        type="email"
                        onChange={handlePinEmailTextChange}
                        value={details.email}
                    />
                </div>
            )}
            <h2 className={SettingsManagerStyles.settings__title}>Theme</h2>
            <div className={SettingsManagerStyles.settings__pair}>
                <div className={SettingsManagerStyles.settings__pair}>
                    <label htmlFor={theme_input_id}>Blocking page theme</label>
                    <select
                        value={theme}
                        className={SettingsManagerStyles.settings__pair__value}
                        id={theme_input_id}
                        onChange={handleThemeChange}
                    >
                        <option value="default">Default</option>
                        <option value="minimalist">Minimalist</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SettingsManager;
