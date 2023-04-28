/* global chrome */
import React, { useState, useEffect } from "react";
import { deepCopy, getUniqueId } from "../../utils/utils";
import { Modal } from "./Modal";
import ProtectionModalStyles from "./ProtectionModal.module.css";

function PasswordTypeForm(props) {
    const password_modal_password_input_id = getUniqueId("password-modal-password-input-id");
    return (
        <div class={ProtectionModalStyles.protection_modal__content__pair}>
            <label for={password_modal_password_input_id}>Password</label>
            <input
                id={password_modal_password_input_id}
                type="password"
                data-key-dict="password"
                onChange={props.onChange}
                value={props.formData.password}
                class={ProtectionModalStyles.protection_modal__content__value}
            />
        </div>
    );
}

function PinTypeForm(props) {
    const pin_modal_pin_input_id = getUniqueId("pin-modal-pin-input-id");
    return (
        <div class={ProtectionModalStyles.protection_modal__content__pair}>
            <label for={pin_modal_pin_input_id}>PIN</label>
            <input
                id={pin_modal_pin_input_id}
                type="password"
                data-key-dict="pin"
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
            } else if (result.passwordData.protectionType === "PIN") {
                const email = result.passwordData.details.email;
                fetch(`https://liberty-arrow-backend.vercel.app/create-pin?email=${email}`)
                    .then((response) => {
                        response.text().then((pin) => {
                            console.log(pin);
                            setTempData({ pin: pin });
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
            case "PIN":
                if (formData.pin === "") {
                    setValidationErrorMessage("You must enter a PIN.");
                } else if (!tempData.pin || formData.pin !== tempData.pin) {
                    setValidationErrorMessage("Passwords don't match.");
                } else {
                    props.onLogInSucess()
                };
                break;
            default:
                console.error("ProtectionModal : protectionData.protectionType is not known");
                break;
        }
    }
    if (!["None", "Password", "PIN"].includes(protectionData.protectionType))
        console.error("UnexpectedResult: protectionData.protectionType is not known.");
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
                    {protectionData.protectionType === "PIN" && (
                        <PinTypeForm onChange={handleChange} formData={formData} />
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
