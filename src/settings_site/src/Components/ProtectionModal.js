/* global chrome */
import React from 'react';
import { deepCopy } from '../Utils/utils';
import { Modal } from './Modal';

function PasswordTypeForm(props) {
    return (<input type='password' data-key-dict='password' onChange={props.onChange} value={props.formData.password} />);
}

class ProtectionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { protectionData: { protectionType: 'None', details: null }, formData: {} };
        chrome.storage.local.get('passwordData', (result) => {
            this.setState((prevState) => {
                return {
                    protectionData: result.passwordData,
                    formData: prevState.formData
                }
            });
            console.info('Data loaded!');
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
                formData: newFormData
            };
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if ((this.state.protectionData.protectionType == 'None')
            || (this.state.protectionData.protectionType == 'Password' && this.state.protectionData.details.password == this.state.formData.password))
            this.props.onLogInSucess();
    }
    render() {
        if (!['None', 'Password'].includes(this.state.protectionData.protectionType))
            console.error('UnexpectedResult: this.state.protectionData.protectionType is not known.');
        return (
            <Modal>
                <form onSubmit={this.handleSubmit}>
                    {this.state.protectionData.protectionType == 'Password' && <PasswordTypeForm onChange={this.handleChange} formData={this.state.formData} />}
                    <input type='submit' />
                </form>
            </Modal>);
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
    render() {
        if (!this.state.loggedIn)
            return <ProtectionModal onLogInSucess={this.handleLogInSucess} />;
        else
            return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}