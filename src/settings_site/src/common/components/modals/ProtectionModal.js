/* global chrome */
import React from "react";
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

class ProtectionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            protectionData: { protectionType: "None", details: null },
            formData: {},
            validationErrorMessage: null,
        };
        chrome.storage.local.get("passwordData", (result) => {
            this.setState((prevState) => {
                return {
                    protectionData: result.passwordData,
                    formData: prevState.formData,
                };
            });
            console.info("Data loaded!");
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const keyDict = event.target.dataset.keyDict;
        const value = event.target.value;
        this.setState((prevState) => {
            let newFormData = deepCopy(prevState.formData);
            newFormData[keyDict] = value;
            return {
                protectionData: prevState.protectionData,
                formData: newFormData,
            };
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        switch (this.state.protectionData.protectionType) {
            case "None":
                this.props.onLogInSucess();
                break;
            case "Password":
                if (this.state.formData.password === "") this.setValidationErrorMessage("You must enter a password.");
                else if (this.state.formData.password !== this.state.protectionData.details.password)
                    this.setValidationErrorMessage("Passwords don't match.");
                else this.props.onLogInSucess();
                break;
            default:
                break;
        }
    }
    setValidationErrorMessage(message) {
        this.setState((prevState) => ({
            protectionData: prevState.protectionData,
            formData: prevState.formData,
            validationErrorMessage: message,
        }));
    }
    render() {
        if (!["None", "Password"].includes(this.state.protectionData.protectionType))
            console.error("UnexpectedResult: this.state.protectionData.protectionType is not known.");
        return (
            <Modal>
                <div class={ProtectionModalStyles.protection_modal__content}>
                    <form onSubmit={this.handleSubmit}>
                        <div class={ProtectionModalStyles.protection_modal__content__logo_wrapper}>
                            <img
                                src="/static/images/Liberty_Arrow_text-false.png"
                                width="100px"
                                height="100px"
                                alt="logo"
                            />
                        </div>
                        <h1 class={ProtectionModalStyles.protection_modal__content__title}>Log In to Liberty Arrow</h1>
                        {this.state.protectionData.protectionType === "Password" && (
                            <PasswordTypeForm onChange={this.handleChange} formData={this.state.formData} />
                        )}
                        {this.state.validationErrorMessage && (
                            <span class={ProtectionModalStyles.protection_modal__content__validation_error_message}>
                                {this.state.validationErrorMessage}
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
}

export class ProtectionController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false };
        this.handleLogInSucess = this.handleLogInSucess.bind(this);
    }
    handleLogInSucess() {
        this.setState({ loggedIn: true }, () => {
            console.info("Logged in sucessfully!");
        });
    }
    componentDidMount() {
        document.title = "Login - Liberty Arrow";
    }
    render() {
        if (!this.state.loggedIn) return <ProtectionModal onLogInSucess={this.handleLogInSucess} />;
        else return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}
