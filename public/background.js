const Types = {group: '1', unique: '2'};
chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.local.get('blockedPages',function(result){
		if(!result.blockedPages)
			chrome.storage.local.set({blockedPages: {type: Types.group, name: null, isRoot: true, childs: []}},function(){console.log('Setted root correctly')});
	});
});

function pageInTree(url,root)
{
	if(root.type === Types.unique)
	{
		return url.includes(root.url);
	}
	else if(root.type === Types.group)
	{
		for(let child of root.childs)
			if(pageInTree(url,child))
				return true;
		return false;
	}
	else
	{
		console.error('UnexpectedResult: root.type is not known.')
        return false;
	}
}

let blockedPages = {};
chrome.storage.local.get('blockedPages',function(result){
	blockedPages = result.blockedPages;
});
let currentTab  = null;

chrome.storage.onChanged.addListener(function(changes,namespace){
	if(namespace == 'local')
	{
		for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
			if(key == 'blockedPages'){
				blockedPages = newValue;
			}
		}
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo){
	currentTab = activeInfo.tabId;
	console.log(currentTab);
});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	if(tabId == currentTab)
	{
		console.log(tab.url);
		console.log(blockedPages);
		if(pageInTree(tab.url, blockedPages))
			chrome.tabs.update(tabId,{url: "https://github.com/GaryNLOL"});
	}
});