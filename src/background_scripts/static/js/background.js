// Define types constant dictionary
const Types = { group: "1", byUrl: "2", byWord: "3" };

class ExtensionBackgroundWorker {
    constructor() {
        this.blockedPages = {};
        this.theme = "default";
    }
    static includesSite(tabInfo, root) {
        switch (root.type) {
            case Types.byUrl:
                if (!tabInfo.url) {
                    return false;
                }

                // If root is of "byUrl" type, check regex
                if (root.url.startsWith("/") && root.url.endsWith("/") && root.url.length > 2) {
                    return RegExp(root.url.substring(1, root.url.length - 1)).test(tabInfo.url);
                }
                return tabInfo.url.includes(root.url);
            case Types.group:
                // If root is of "group" type, check children recursively
                for (let child of root.children) {
                    if (ExtensionBackgroundWorker.includesSite(tabInfo, child)) {
                        return true;
                    }
                }
                return false;
            case Types.byWord:
                if (!tabInfo.title) {
                    return false;
                }
                // If root is of "byUrl" type, check regex
                if (root.word.startsWith("/") && root.word.endsWith("/") && root.word.length > 2) {
                    return RegExp(root.word.substring(1, root.word.length - 1)).test(tabInfo.title);
                }
                return tabInfo.title.includes(root.word);
            default:
                console.error("UnexpectedResult: root.type is not known.");
                return false;
        }
    }
    saveDefaultDataOnInstall() {
        // Set storage to default value on install if no previous data exists
        chrome.runtime.onInstalled.addListener(() => {
            chrome.storage.local.get(null, (result) => {
                if (Object.keys(result).length == 0)
                    chrome.storage.local.set(
                        {
                            blockedPages: { type: Types.group, name: "All pages", isRoot: true, children: [] },
                            passwordData: { protectionType: "None", details: null },
                            theme: "default"
                        },
                        () => {
                            console.info("Set data correctly");
                        }
                    );
            });
        });
    }
    syncDataWithStorage() {
        // Load blocked pages
        chrome.storage.local.get(["blockedPages", "theme"]).then((result) => {
            this.blockedPages = result.blockedPages;
            this.theme = result.theme;
        });

        // Reload blocked pages when there are changes
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace == "local") {
                for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                    if (key == "blockedPages") {
                        this.blockedPages = newValue;
                    } else if (key == "theme") {
                        this.theme = newValue;
                    }
                }
            }
        });
    }
    blockListedPages() {
        // Listen for change in tabs and block them
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
            // Check that url exists
            if (changeInfo.title || changeInfo.url) {
                let webpage_url = `https://liberty-arrow-backend.vercel.app/block-screens/${this.theme}`;

                // Log data for debugging
                console.info(changeInfo, this.blockedPages, ExtensionBackgroundWorker.includesSite(changeInfo, this.blockedPages));

                const title = changeInfo.title ? changeInfo.title.toLowerCase() : null;
                const url = changeInfo.url ? changeInfo.url.toLowerCase() : null;

                // Check if page exists in directory tree
                if (ExtensionBackgroundWorker.includesSite({ title: title, url: url }, this.blockedPages)) {
                    // Block website
                    console.info("Updating");
                    chrome.tabs.update(tabId, { url: webpage_url });
                }
            }
        });
    }
}

worker = new ExtensionBackgroundWorker();
worker.saveDefaultDataOnInstall();
worker.syncDataWithStorage();
worker.blockListedPages();