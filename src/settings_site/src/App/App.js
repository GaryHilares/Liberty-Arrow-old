import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { HomeTab } from "../Home/Home";
import { PagesTab } from "../Pages/Pages";
import { SettingsTab } from "../Settings/Settings";
import { NavBar } from "../common/components/NavBar";
import { ProtectionController } from "../common/components/modals/ProtectionModal";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ProtectionController>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomeTab />} />
            <Route path="/pages" element={<PagesTab />} />
            <Route path="/settings" element={<SettingsTab />} />
          </Routes>
        </ProtectionController>
      </div>
    </Router>
  );
}

export default App;