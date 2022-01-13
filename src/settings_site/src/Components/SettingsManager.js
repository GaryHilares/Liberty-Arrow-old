/* global chrome */
import React from 'react';
import { getUniqueId } from '../Utils/utils';

class SettingsManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = { protectionType: 'None', details: null };
        this.handleProtectionTypeChange = this.handleProtectionTypeChange.bind(this);
        this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this);
        this.save = this.save.bind(this);
    }
    handleProtectionTypeChange(event) {
        let newState = { protectionType: event.target.value };
        switch (event.target.value) {
            case 'None':
                newState['details'] = {};
                break;
            case 'Password':
                newState['details'] = { password: '' };
                break;
            default:
                newState['details'] = null;
                console.error('UnexpectedResult: this.state.tab is not known.');
        }
        this.setState(newState);
    }
    handlePasswordTextChange(event) {
        this.setState({ details: { password: event.target.value } });
    }
    save() {
        console.log(this.state);
        chrome.storage.local.set({ 'passwordData': this.state });
    }
    render() {
        if (!(this.state.protectionType in ['None', 'Password']))
            console.error('UnexpectedResult: this.state.protectionType is not known.');
        const password_protection_select_id = getUniqueId('password-protection-select');
        return (
            <div>
                <label htmlFor={password_protection_select_id}>Password Protection</label>
                <select id={password_protection_select_id} onChange={this.handleProtectionTypeChange} defaultValue={this.state.protectionType}>
                    <option value='None'>None</option>
                    <option value='Password'>Password</option>
                </select>
                {this.state.protectionType === 'Password' && <input type='password' onChange={this.handlePasswordTextChange} />}
                <button onClick={this.save}>Save</button>
            </div>
        );
    }
}

export default SettingsManager;