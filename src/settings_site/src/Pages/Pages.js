import React from "react";
import { ProfileEditor } from "./PageManager";

export function PagesTab() {
    React.useEffect(() => {
        document.title = "Pages - Liberty Arrow";
    }, []);
    return <ProfileEditor />;
}
