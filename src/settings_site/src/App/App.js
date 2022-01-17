import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { HomeTab } from "../Tabs/HomeTab";
import { PagesTab } from "../Tabs/PagesTab";
import { SettingsTab } from "../Tabs/SettingsTab";
import { NavBar } from "../Components/NavBar";
import { ProtectionController } from "../Components/ProtectionModal";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeTab />} />
          <Route path="/pages" element={<PagesTab />} />
          <Route path="/settings" element={<SettingsTab />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;