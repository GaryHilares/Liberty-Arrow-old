import React from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate} from "react-router-dom";
import HomeTab from "../Tabs/HomeTab";
import PagesTab from "../Tabs/PagesTab";
import SettingsTab from "../Tabs/SettingsTab";

function NavBar()
{
  return (
  <div>
    <Link to='/home'>Home</Link>
    <Link to='/pages'>Pages</Link>
    <Link to='/settings'>Settings</Link>
  </div>);
}

function App(){
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/index.html" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeTab />} />
          <Route path="/pages" element={<PagesTab />} />
          <Route path="/settings" element={<SettingsTab />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;