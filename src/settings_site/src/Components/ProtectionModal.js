/* global chrome */
import React from 'react';
import { Modal } from './Modal';

function PasswordTypeForm() {
    return (<input type='password' />);
}

class ProtectionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { protectionType: 'None', details: null };
        chrome.storage.local.get('passwordData', (result) => {
            this.setState(result.passwordData);
            console.log('Data loaded!');
        });
    }
    render() {
        if (!(this.state.protectionType in ['None', 'Password']))
            console.error('UnexpectedResult: this.state.protectionType is not known.');
        return (
            <Modal>
                <form onSubmit={this.handleSubmit}>
                    {this.state.protectionType == 'Password' && <PasswordTypeForm />}
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
        /*if (!this.state.loggedIn)
            return <ProtectionModal onLoginSucess={this.handleLogInSucess} />;
        else
            return this.children;*/
        return this.children;
    }
}