import { deepCopy } from "../utils/utils.js";

class Profile {
    constructor(name, sites) {
        if (!name || !sites) {
            throw new Error("PageTree : A value passed to the constructor is invalid");
        }
        this.name = name;
        this.sites = sites;
    }
    getSiteIndex(name) {
        return this.sites
            .map((e) => e.pattern)
            .indexOf(name);
    }
    insertSite(newValue) {
        this.sites.push(newValue);
    }
    deleteSite(name) {
        const index = this.getSiteIndex(name);
        this.sites.splice(index, 1);
    }

    getDeepCopy() {
        return new Profile(this.name, deepCopy(this.sites));
    }
}

export { Profile };