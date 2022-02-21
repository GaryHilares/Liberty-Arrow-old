import React from "react";
import PageManager from "../Components/PageManager";

export function PagesTab() {
  React.useEffect(() => {
    document.title = "Pages - Liberty Arrow";
  }, []);
  return (<PageManager />);
}