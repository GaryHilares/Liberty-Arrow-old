import SettingsManager from "./SettingsManager";
import React from "react";

export function SettingsTab() {
  React.useEffect(() => {
    document.title = "Settings - Liberty Arrow";
  }, []);
  return (<SettingsManager />);
}
