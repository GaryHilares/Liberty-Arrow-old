/* global chrome */
import React from 'react';
import { Modal } from './Modal';

function PasswordTypeForm() {
    return (<input type='password' />);
}

export class ProtectionModal extends React.Component {
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
                {this.state.protectionType == 'Password' && <PasswordTypeForm />}
            </Modal>);
    }
}