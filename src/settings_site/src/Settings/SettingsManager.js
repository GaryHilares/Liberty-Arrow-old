/* global chrome */
import React from 'react';
import { getUniqueId } from '../common/utils/utils';
import SettingsManagerStyles from "./SettingsManager.module.css";

class SettingsManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = { protectionType: 'None', details: null };
        chrome.storage.local.get('passwordData', (result) => {
            this.setState(result.passwordData, () => {
                console.info("Data loaded successfully!");
                console.info(result.passwordData);
            });
        });
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
        const password_input_id = getUniqueId('password-input-id');
        return (
            <div className={SettingsManagerStyles.settings_manager}>
                <div className={SettingsManagerStyles.settings__pair}>
                    <label htmlFor={password_protection_select_id}>Protection Type</label>
                    <select value={this.state.protectionType} className={SettingsManagerStyles.settings__pair__value} id={password_protection_select_id} onChange={this.handleProtectionTypeChange}>
                        <option value='None'>None</option>
                        <option value='Password'>Password</option>
                    </select>
                </div>
                {this.state.protectionType === 'Password' && (
                    <div className={SettingsManagerStyles.settings__pair}>
                        <label htmlFor={password_input_id}>Password</label>
                        <input className={SettingsManagerStyles.settings__pair__value} id={password_input_id} type='password' onChange={this.handlePasswordTextChange} value={this.state.details.password} />
                    </div>
                )}
                <div className={SettingsManagerStyles.settings__buttons_box}>
                    <button className={SettingsManagerStyles.settings__buttons_box__save_button} onClick={this.save}>Save</button>
                </div>
            </div>
        );
    }
}

export default SettingsManager;