import React from "react";
import { ProfileEditor } from "../components/ProfileEditor.js";

export function PagesTab() {
    React.useEffect(() => {
        document.title = "Pages - Liberty Arrow";
    }, []);
    return <ProfileEditor />;
}
