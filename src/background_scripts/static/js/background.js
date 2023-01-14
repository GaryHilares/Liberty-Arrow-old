// Define types constant dictionary
const Types = { group: "1", unique: "2" };

// Set storage to default value on install if no previous data exists
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(null, (result) => {
        if (Object.keys(result).length == 0)
            chrome.storage.local.set(
                {
                    blockedPages: { type: Types.group, name: "All pages", isRoot: true, children: [] },
                    passwordData: { protectionType: "None", details: null },
                },
                () => {
                    console.info("Set data correctly");
                }
            );
    });
});

// Define function to check if file exists in certain tree
function pageInTree(url, root) {
    if (root.type === Types.unique) {
        console.log(root.url.substring(1, root.url.length - 1))
        // If root is of "unique" type, check regex
        if (root.url.startsWith("/") && root.url.endsWith("/") && root.url.length > 2) {
            return RegExp(root.url.substring(1, root.url.length - 1)).test(url);
        }
        return url.includes(root.url);
    } else if (root.type === Types.group) {
        // If root is of "group" type, check children recursively
        for (let child of root.children) {
            if (pageInTree(url, child)) {
                return true;
            }
        }
        return false;
    } else {
        console.error("UnexpectedResult: root.type is not known.");
        return false;
    }
}

// Load blocked pages
let blockedPages = {};
chrome.storage.local.get("blockedPages", (result) => {
    blockedPages = result.blockedPages;
});
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace == "local") {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            if (key == "blockedPages") {
                blockedPages = newValue;
            }
        }
    }
});

// Listen for change in tabs and block them
chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
    // Check that url exists
    if (changeInfo.url) {
        let webpage_url = "/blocked.html";

        // Log data for debugging
        console.info(changeInfo.url, blockedPages, pageInTree(changeInfo.url, blockedPages));

        // Check if page exists in directory tree
        if (pageInTree(changeInfo.url, blockedPages)) {
            // Block website
            console.info("Updating");
            chrome.tabs.update(tabId, { url: webpage_url });
        }
    }
});
