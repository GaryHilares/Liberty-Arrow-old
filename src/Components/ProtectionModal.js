/* global chrome */
import React from 'react';
import {Modal} from './Modal';

function PasswordTypeForm(){
    return (<input type='password' />);
}

class ProtectionModal extends React.Component
{
    render(){
        if(!(this.props.type in ['None','Password']))
            console.error('UnexpectedResult: this.props.type is not known.');
        return (
        <Modal>
            {this.props.type == 'Password' && <PasswordTypeForm />}
        </Modal>);
    }
}

/* Working on it */