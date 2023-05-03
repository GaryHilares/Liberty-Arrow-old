/* global chrome */
import React, { useEffect, useState } from "react";
import { getUniqueIdHandler } from "../common/utils/utils";
import SettingsManagerStyles from "./SettingsManager.module.css";

function SettingsManager() {
    const idHandler = getUniqueIdHandler();
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
            case "Email Confirmation":
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
    function handleEmailTextChange(event) {
        setDetails({ email: event.target.value });
    }
    function handleThemeChange(event) {
        setTheme(event.target.value);
    }
    if (!["None", "Password", "Email Confirmation"].includes(protectionType)) {
        console.error("UnexpectedResult: protectionType is not known.");
    }
    return (
        <div className={SettingsManagerStyles.settings_manager}>
            <h2 className={SettingsManagerStyles.settings__title}>Password</h2>
            <div className={SettingsManagerStyles.settings__pair}>
                <label htmlFor={idHandler.get("password-protection-select")}>Protection Type</label>
                <select
                    value={protectionType}
                    className={SettingsManagerStyles.settings__pair__value}
                    id={idHandler.get("password-protection-select")}
                    onChange={handleProtectionTypeChange}
                >
                    <option value="None">None</option>
                    <option value="Password">Password</option>
                    <option value="Email Confirmation">Email Confirmation</option>
                </select>
            </div>
            {protectionType === "Password" && (
                <div className={SettingsManagerStyles.settings__pair}>
                    <label htmlFor={idHandler.get("password-input-id")}>Password</label>
                    <input
                        className={SettingsManagerStyles.settings__pair__value}
                        id={idHandler.get("password-input-id")}
                        type="password"
                        onChange={handlePasswordTextChange}
                        value={details.password}
                    />
                </div>
            )}
            {protectionType === "Email Confirmation" && (
                <div className={SettingsManagerStyles.settings__pair}>
                    <label htmlFor={idHandler.get("pin-email-input-id")}>Email</label>
                    <input
                        className={SettingsManagerStyles.settings__pair__value}
                        id={idHandler.get("pin-email-input-id")}
                        type="email"
                        onChange={handleEmailTextChange}
                        value={details.email}
                    />
                </div>
            )}
            <h2 className={SettingsManagerStyles.settings__title}>Theme</h2>
            <div className={SettingsManagerStyles.settings__pair}>
                <div className={SettingsManagerStyles.settings__pair}>
                    <label htmlFor={idHandler.get("theme-input-id")}>Blocking page theme</label>
                    <select
                        value={theme}
                        className={SettingsManagerStyles.settings__pair__value}
                        id={idHandler.get("theme-input-id")}
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
