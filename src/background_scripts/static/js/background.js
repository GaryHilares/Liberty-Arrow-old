function matchesPattern(pattern, text) {
    if (pattern.startsWith("/") && pattern.endsWith("/") && pattern.length > 2) {
        return RegExp(pattern.substring(1, pattern.length - 1), 'i').test(text);
    }
    return text.toLowerCase().includes(pattern.toLowerCase());
}

class ExtensionBackgroundWorker {
    constructor() {
        this.blockedPages = {};
        this.theme = "default";
    }
    static includesSite(tabInfo, root) {
        const now = new Date();
        return root.sites.some((siteRule) => {
            // Ignore site rule if the current time is not within its limits
            const startTime = new Date(`01/01/1970 ${siteRule.startTime || "00:00"}`);
            const endTime = new Date(`01/01/1970 ${siteRule.endTime || "23:59"}`);
            if (now.getHours() < startTime.getHours() || (now.getHours() == startTime.getHours() && now.getMinutes() < startTime.getMinutes())
                || now.getHours() > endTime.getHours() || (now.getHours() == endTime.getHours() && now.getMinutes() > endTime.getMinutes())) {
                return false;
            }

            // Check if information to check (URL and/or title) matches the pattern
            return [[siteRule.blocksUrl, tabInfo.url], [siteRule.blocksTitle, tabInfo.title]].some(([conditionToCheck, informationToCheck]) => {
                return conditionToCheck && informationToCheck && matchesPattern(siteRule.pattern, informationToCheck);
            });
        });
    }
    saveDefaultDataOnInstall() {
        // Set storage to default value on install if no previous data exists
        chrome.runtime.onInstalled.addListener(() => {
            chrome.storage.local.get(null, (result) => {
                if (Object.keys(result).length == 0)
                    chrome.storage.local.set(
                        {
                            blockedPages: { name: "Default Profile", sites: [] },
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