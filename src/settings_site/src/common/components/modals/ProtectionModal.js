/* global chrome */
import React, { useState, useEffect } from "react";
import { deepCopy, getUniqueIdHandler } from "../../utils/utils";
import { Modal } from "./Modal";
import ProtectionModalStyles from "./ProtectionModal.module.css";

function PasswordTypeForm(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={ProtectionModalStyles.protection_modal__content__pair}>
            <label for={idHandler.get("password-input-id")}>Password</label>
            <input
                id={idHandler.get("password-input-id")}
                type="password"
                data-key-dict="password"
                onChange={props.onChange}
                value={props.formData.password}
                class={ProtectionModalStyles.protection_modal__content__value}
            />
        </div>
    );
}

function EmailConfirmationTypeForm(props) {
    const idHandler = getUniqueIdHandler();
    return (
        <div class={ProtectionModalStyles.protection_modal__content__pair}>
            <label for={idHandler.get("email-confirmation-input-id")}>Email Code</label>
            <input
                id={idHandler.get("email-confirmation-input-id")}
                type="password"
                data-key-dict="emailCode"
                onChange={props.onChange}
                value={props.formData.password}
                class={ProtectionModalStyles.protection_modal__content__value}
            />
        </div>
    );
}

function ProtectionModal(props) {
    const [protectionData, setProtectionData] = useState({ protectionType: "None", details: null });
    const [formData, setFormData] = useState({});
    const [validationErrorMessage, setValidationErrorMessage] = useState(null);
    const [tempData, setTempData] = useState({});
    useEffect(() => {
        chrome.storage.local.get("passwordData", (result) => {
            setProtectionData(result.passwordData);
            console.info("Data loaded!");
            if (result.passwordData.protectionType === "None") {
                props.onLogInSucess();
            } else if (result.passwordData.protectionType === "Email Confirmation") {
                const email = result.passwordData.details.email;
                fetch(`https://liberty-arrow-backend.vercel.app/create-pin?email=${email}`)
                    .then((response) => {
                        response.text().then((emailCode) => {
                            console.log(emailCode);
                            setTempData({ emailCode: emailCode });
                        });
                    });
            }
        })
    }, []);
    function handleChange(event) {
        const keyDict = event.target.dataset.keyDict;
        const value = event.target.value;
        setFormData((prevFormData) => {
            let newFormData = deepCopy(prevFormData);
            newFormData[keyDict] = value;
            return newFormData;
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        switch (protectionData.protectionType) {
            case "None":
                props.onLogInSucess();
                break;
            case "Password":
                if (formData.password === "") {
                    setValidationErrorMessage("You must enter a password.");
                } else if (formData.password !== protectionData.details.password) {
                    setValidationErrorMessage("Passwords don't match.");
                } else {
                    props.onLogInSucess()
                };
                break;
            case "Email Confirmation":
                if (formData.emailCode === "") {
                    setValidationErrorMessage("You must enter the code that was sent to your email.");
                } else if (!tempData.emailCode || formData.emailCode !== tempData.emailCode) {
                    setValidationErrorMessage("Codes don't match.");
                } else {
                    props.onLogInSucess()
                };
                break;
            default:
                console.error("ProtectionModal : protectionData.protectionType is not known");
                break;
        }
    }
    if (!["None", "Password", "Email Confirmation"].includes(protectionData.protectionType)) {
        console.error("UnexpectedResult: protectionData.protectionType is not known.");
    }
    return (
        <Modal>
            <div class={ProtectionModalStyles.protection_modal__content}>
                <form onSubmit={handleSubmit}>
                    <div class={ProtectionModalStyles.protection_modal__content__logo_wrapper}>
                        <img
                            src="/static/images/Liberty_Arrow_text-false.png"
                            width="100px"
                            height="100px"
                            alt="logo"
                        />
                    </div>
                    <h1 class={ProtectionModalStyles.protection_modal__content__title}>Log In to Liberty Arrow</h1>
                    {protectionData.protectionType === "Password" && (
                        <PasswordTypeForm onChange={handleChange} formData={formData} />
                    )}
                    {protectionData.protectionType === "Email Confirmation" && (
                        <EmailConfirmationTypeForm onChange={handleChange} formData={formData} />
                    )}
                    {validationErrorMessage && (
                        <span class={ProtectionModalStyles.protection_modal__content__validation_error_message}>
                            {validationErrorMessage}
                        </span>
                    )}
                    <div class={ProtectionModalStyles.protection_modal__content__buttons_box}>
                        <input
                            type="submit"
                            value="Log In"
                            class={ProtectionModalStyles.protection_modal__content__buttons_box__submit_button}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export function ProtectionController(props) {
    useEffect(() => {
        document.title = "Login - Liberty Arrow";
    }, []);

    const [loggedIn, setLoggedIn] = useState(false);
    function handleLogInSucess() {
        setLoggedIn({ loggedIn: true });
        console.info("Logged in sucessfully!");
    }

    if (!loggedIn) {
        return <ProtectionModal onLogInSucess={handleLogInSucess} />;
    } else {
        return <React.Fragment>{props.children}</React.Fragment>
    }
}
