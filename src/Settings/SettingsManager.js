/* global chrome */
import React from 'react';

class SettingsManager extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {passwordType: 'None', details: null};
        this.handleMainSelectChange = this.handleMainSelectChange.bind(this);
        this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this);
        this.handleChallengeSelectChange = this.handleChallengeSelectChange.bind(this);
        this.save = this.save.bind(this);
    }
    handleMainSelectChange(event)
    {
        let newState = {passwordType: event.target.value};
        switch(event.target.value)
        {
        case 'None':
            newState['details'] = {};
            break;
        case 'Password':
            newState['details'] = {password: ''};
            break;
        case 'Challenge':
            newState['details'] = {type: 'Tetris'};
            break;
        default:
            newState['details'] = null;
            console.error('UnexpectedResult: this.state.tab is not known.')
        }
        this.setState(newState);
    }
    handlePasswordTextChange(event)
    {
        this.setState({details: {password: event.target.value}});
    }
    handleChallengeSelectChange(event)
    {
        this.setState({details: {type: event.target.value}});
    }
    getDependantForm()
    {
        switch(this.state.passwordType)
        {
        case 'None':
            return null;
        case 'Password':
            return (<input type='password' onChange={this.handlePasswordTextChange} />);
        default:
            console.error('UnexpectedResult: this.state.passwordType is not known.')
            return null;
        }
    }
    save(){
        console.log(this.state);
        chrome.storage.local.set({'passwordData': this.state});
    }
    render(){
        return (
        <div>
            <span>Password Protection</span>
            <select onChange={this.handleMainSelectChange} defaultValue={this.state.passwordType}>
                <option value='None'>None</option>
                <option value='Password'>Password</option>
            </select>
            {this.getDependantForm()}
            <button onClick={this.save}>Save</button>
        </div>
        );
    }
}

export default SettingsManager;