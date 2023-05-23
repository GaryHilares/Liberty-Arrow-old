import { PagesTab } from "../pages/Pages.js";
import { SettingsTab } from "../pages/Settings.js";
import { NavBar } from "../components/navbar/NavBar.js";
import { ProtectionController } from "../components/modals/ProtectionModal.js";
import '../styles/globals.css';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React from "react";

function App() {
    return (
        <Router>
            <div className="App">
                <ProtectionController>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/pages" />} />
                        <Route path="/pages" element={<PagesTab />} />
                        <Route path="/settings" element={<SettingsTab />} />
                    </Routes>
                </ProtectionController>
            </div>
        </Router>
    );
}

export default App;