import { Instructions } from './Instructions';
import React from "react";

export function HomeTab() {
  React.useEffect(() => {
    document.title = "Home - Liberty Arrow";
  }, []);
  return <Instructions />;
}