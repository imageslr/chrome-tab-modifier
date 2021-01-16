/*jshint esversion: 6, loopfunc: true */

let options_url = chrome.extension.getURL('html/options.html'), openOptionsPage, getStorage;

// --------------------------------------------------------------------------------------------------------
// Functions

openOptionsPage = function (hash) {
    chrome.tabs.query({ url: options_url }, function (tabs) {
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { active: true, highlighted: true }, function (current_tab) {
                chrome.windows.update(current_tab.windowId, { focused: true });
            });
        } else {
            chrome.tabs.create({ url: (hash !== undefined) ? options_url + '#' + hash : options_url });
        }
    });
};

getStorage = function (callback) {
    chrome.storage.local.get('tab_modifier', function (items) {
        callback(items.tab_modifier);
    });
};

// --------------------------------------------------------------------------------------------------------
// Events

chrome.runtime.onMessage.addListener(function (message, sender) {
    switch (message.action) {
        case 'setUnique':
            chrome.tabs.get(sender.tab.id, function (current_tab) {
                if (current_tab === undefined) {
                    return;
                }
                
                let tab, tab_id;
                
                chrome.tabs.query({}, function (tabs) {
                    for (let i = 0; i < tabs.length; i++) {
                        tab = tabs[i];
                        
                        if (tab.url.indexOf(message.url_fragment) !== -1 && tab.id !== current_tab.id) {
                            tab_id = tab.id;
                            
                            chrome.tabs.executeScript(current_tab.id, {
                                code: 'window.onbeforeunload = null;'
                            }, function () {
                                chrome.tabs.remove(current_tab.id);
                                
                                chrome.tabs.update(tab_id, {
                                    url: current_tab.url,
                                    highlighted: true
                                });
                            });
                        }
                    }
                });
            });
            break;
        case 'setPinned':
            chrome.tabs.update(sender.tab.id, {
                pinned: true
            });
            break;
        case 'setMuted':
            chrome.tabs.update(sender.tab.id, {
                muted: true
            });
            break;
    }
});

chrome.browserAction.onClicked.addListener(function () {
    openOptionsPage();
});

chrome.runtime.onInstalled.addListener(function (details) {
    switch (details.reason) {
        case 'install':
            openOptionsPage('install');
            chrome.alarms.create('saveToJsonBlob', { periodInMinutes: 1 });
            break;
        case 'update':
            getStorage(function (tab_modifier) {
                if (tab_modifier === undefined || tab_modifier.settings === undefined) {
                    return;
                }
                
                if (tab_modifier.settings !== undefined && tab_modifier.settings.enable_new_version_notification === true && details.previousVersion !== chrome.runtime.getManifest().version) {
                    openOptionsPage('update/' + chrome.runtime.getManifest().version);
                }
            });
            break;
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    switch (alarm.name) {
        case "saveToJsonBlob":
            console.log("Prepare to save rules to Jsob Blob...")
            getStorage(function (tab_modifier) {
                if (tab_modifier === undefined) return;
                if (!tab_modifier.settings || !tab_modifier.settings.json_blob_url) return;

                var xhr = new XMLHttpRequest();
                xhr.open("PUT", tab_modifier.settings.json_blob_url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onload = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log("Successfully save to Json Blob. Result: ", xhr.responseText)
                    } else {
                        console.log("Failed to save to Json Blob. Result: ", xhr.responseText)
                    }
                };
                xhr.send(JSON.stringify(tab_modifier, null, 4));
            })
        break;
    }
});

chrome.contextMenus.create({
    id: 'rename-tab',
    title: 'Rename Tab',
    contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === 'rename-tab') {        
        getStorage(function (tab_modifier) {
            if (tab_modifier === undefined) {
                tab_modifier = {
                    settings: {
                        enable_new_version_notification: false,
                        json_blob_url: ""
                    },
                    rules: []
                };
            }

            let oldTitle = ""
            tab_modifier.rules = tab_modifier.rules.filter(({ tab: { title }, url_fragment }) => {
                if (url_fragment != tab.url) return true;
                oldTitle = title
                return false
            })

            let title = prompt('Enter the new title, a Tab rule will be automatically created for you based on current URL', oldTitle);
            if (title === null) return
            
            if (title != "") {
                let rule = {
                    name: title || tab.title,
                    detection: 'CONTAINS',
                    url_fragment: tab.url,
                    tab: {
                        title: title,
                        icon: null,
                        pinned: false,
                        protected: false,
                        unique: false,
                        muted: false,
                        title_matcher: null,
                        url_matcher: null
                    }
                };
                tab_modifier.rules.push(rule);
            }
            
            chrome.storage.local.set({ tab_modifier: tab_modifier });
            
            chrome.tabs.executeScript(tab.id, {
                code: `document.title = "${title}"`
            });
            // chrome.tabs.reload(tab.id); // not reload
        });
    }
});
