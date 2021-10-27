import React from 'react';

class PasswordModal extends React.Component
{
    getForm()
    {
        switch(this.props.type){
        case 'None':
            return null;
        case 'Password':
            return (<input type='password' />);
        case 'Challenge':
            return <span>Challenge</span>;
        default:
            console.error('UnexpectedResult: this.props.type is not known.');
        }
    }
    render(){
        return (
        <div>
            {this.getForm()}
        </div>);
    }
}

/* Working on it */