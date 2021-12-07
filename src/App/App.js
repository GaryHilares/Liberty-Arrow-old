import React from "react";
import HomeTab from "../Tabs/HomeTab/HomeTab";
import PagesTab from "../Tabs/PagesTab/PagesTab";
import SettingsTab from "../Tabs/SettingsTab/SettingsTab";

class NavBar extends React.Component
{
  render(){
    return (
    <React.Fragment>
      <div>
        <button onClick={this.props.handleTabButtonClick} value='Home'>Home</button>
        <button onClick={this.props.handleTabButtonClick} value='Pages'>Pages</button>
        <button onClick={this.props.handleTabButtonClick} value='Settings'>Settings</button>
      </div>
    </React.Fragment>);
  }
}

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {tab: "Home"};
    this.handleTabButtonClick = this.handleTabButtonClick.bind(this);
  }
  getPage()
  {
    switch(this.state.tab)
    {
      case 'Home':
        return (<HomeTab />);
      case 'Pages':
        return (<PagesTab />);
      case 'Settings':
        return (<SettingsTab />);
      default:
        console.error('UnexpectedResult: this.state.tab is not known.')
        return null;
    }
  }
  handleTabButtonClick(event)
  {
    this.setState({tab: event.target.value});
  }
  render() {
    return (
      <div className="App">
        <NavBar handleTabButtonClick={this.handleTabButtonClick} />
        {this.getPage()}
      </div>
    );
  }
}

export default App;