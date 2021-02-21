/*
 * arrive.js
 * v2.4.1
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014-2017 Uzair Farooq
 */

var Arrive=function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback)}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave")}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n)},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n}},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback)},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r)},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t}}}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null)}},e.prototype.beforeAdding=function(e){this._beforeAdding=e},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e},e}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n)});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o}),i.beforeRemoving(function(e){e.observer.disconnect()}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n)},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1})},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1},i.removeEvent(t)},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1})},this},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t)})}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a)}c.call(this,e,t,r)},f},u=function(){function e(){var e={childList:!0,subtree:!0};return e}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t)})}function r(e,t){return l.matchesSelector(e,t.selector)}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r)},d},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);
var w = window;

chrome.storage.local.get('tab_modifier', function (items) {
    if (items.tab_modifier === undefined) {
        return;
    }
    
    var tab_modifier = items.tab_modifier, rule = null, processPage;
    
    processPage = async function () {
        // Check if a rule is available
        for (var i = 0; i < tab_modifier.rules.length; i++) {
            if (tab_modifier.rules[i].detection === undefined || tab_modifier.rules[i].detection === 'CONTAINS') {
                if (location.href.indexOf(tab_modifier.rules[i].url_fragment) !== -1) {
                    rule = tab_modifier.rules[i];
                    break;
                }
            } else {
                switch (tab_modifier.rules[i].detection) {
                    case 'STARTS':
                        if (location.href.startsWith(tab_modifier.rules[i].url_fragment) === true) {
                            rule = tab_modifier.rules[i];
                            break;
                        }
                        break;
                    case 'ENDS':
                        if (location.href.endsWith(tab_modifier.rules[i].url_fragment) === true) {
                            rule = tab_modifier.rules[i];
                            break;
                        }
                        break;
                    case 'REGEXP':
                        var regexp = new RegExp(tab_modifier.rules[i].url_fragment);
                        
                        if (regexp.test(location.href) === true) {
                            rule = tab_modifier.rules[i];
                            break;
                        }
                        break;
                    case 'EXACT':
                        if (location.href === tab_modifier.rules[i].url_fragment) {
                            rule = tab_modifier.rules[i];
                            break;
                        }
                        break;
                }
            }
        }
        
        // No rule available
        if (rule === null) {
            return;
        }
        
        var getTextBySelector, updateTitle, processTitle, processIcon;
        
        /**
         * Returns the text related to the given CSS selector
         * @param selector
         * @returns {string}
         */
        getTextBySelector = function (selector) {
            var el = document.querySelector(selector), value = '';
            
            if (el !== null) {
                el = el.childNodes[0];
                
                if (el.tagName === 'input') {
                    value = el.value;
                } else if (el.tagName === 'select') {
                    value = el.options[el.selectedIndex].text;
                } else {
                    value = el.innerText || el.textContent;
                }
            }
            
            return value.trim();
        };
        
        /**
         * Update title string by replacing given tag by value
         * @param title
         * @param tag
         * @param value
         * @returns {*}
         */
        updateTitle = function (title, tag, value) {
            if (value === '') {
                return title;
            }
            
            return title.replace(tag, value);
        };
        
        /**
         * Process new title depending on current URL & current title
         * @param current_url
         * @param current_title
         * @returns {*}
         */
        processTitle = async function (current_url, current_title) {
            var title = rule.tab.title, matches = title.match(/\{([^}]+)}/g), i;
            
            // Handle curly braces tags inside title
            if (matches !== null) {
                var selector, text;
                
                var syncGetTextBySelector = () => new Promise((resolve) => {
                    // if the element already exists, directly enter the callback function.
                    // else when the element is created, enter the callback function.
                    document.arrive(selector, function() {
                        text = getTextBySelector(selector);
                        title = updateTitle(title, matches[i], text);
                        resolve()
                    });
                })
                
                for (i = 0; i < matches.length; i++) {
                    selector = matches[i].substring(1, matches[i].length - 1); 
                    await syncGetTextBySelector()
                }
            }
            
            // Handle title_matcher
            if (rule.tab.title_matcher !== null) {
                try {
                    matches = current_title.match(new RegExp(rule.tab.title_matcher), 'g');
                    
                    if (matches !== null) {
                        for (i = 0; i < matches.length; i++) {
                            title = updateTitle(title, '@' + i, matches[i]);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            
            // Handle url_matcher
            if (rule.tab.url_matcher !== null) {
                try {
                    matches = current_url.match(new RegExp(rule.tab.url_matcher), 'g');
                    
                    if (matches !== null) {
                        for (i = 0; i < matches.length; i++) {
                            title = updateTitle(title, '$' + i, matches[i]);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            
            return title;
        };
        
        /**
         * Remove existing favicon(s) and create a new one
         * @param new_icon
         * @returns {boolean}
         */
        processIcon = function (new_icon) {
            var el, icon, link;
            
            el = document.querySelectorAll('head link[rel*="icon"]');
            
            // Remove existing favicons
            Array.prototype.forEach.call(el, function (node) {
                node.parentNode.removeChild(node);
            });
            
            // Set preconfigured or custom (http|https|data) icon
            icon = (/^(https?|data):/.test(new_icon) === true) ? new_icon : chrome.extension.getURL('/img/' + new_icon);
            
            // Create new favicon
            link      = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel  = 'icon';
            link.href = icon;
            
            document.getElementsByTagName('head')[0].appendChild(link);
            
            return true;
        };
        
        // Set title
        if (rule.tab.title !== null) {
            if (document.title !== null) {
                document.title = await processTitle(location.href, document.title);
            }
        }
        
        var title_changed_by_me = false, observer_title;
        
        // Set up a new observer
        observer_title = new window.WebKitMutationObserver(function (mutations) {
            if (title_changed_by_me === true) {
                title_changed_by_me = false;
            } else {
                mutations.forEach(async function () {
                    if (rule.tab.title !== null) {
                        document.title = await processTitle(location.href, document.title);
                    }
                    
                    title_changed_by_me = true;
                });
            }
        });
        
        // Observe when the website has changed the title
        if (document.querySelector('head > title') !== null) {
            observer_title.observe(document.querySelector('head > title'), {
                subtree: true,
                characterresponse: true,
                childList: true
            });
        }
        
        // Pin the tab
        if (rule.tab.pinned === true) {
            chrome.runtime.sendMessage({ action: 'setPinned' });
        }
        
        // Set new icon
        if (rule.tab.icon !== null) {
            processIcon(rule.tab.icon);
            
            var icon_changed_by_me = false, observer_icon;
            
            // Set up a new observer
            observer_icon = new window.WebKitMutationObserver(function (mutations) {
                if (icon_changed_by_me === true) {
                    icon_changed_by_me = false;
                } else {
                    mutations.forEach(function (mutation) {
                        // Handle favicon changes
                        if (mutation.target.type === 'image/x-icon') {
                            processIcon(rule.tab.icon);
                            
                            icon_changed_by_me = true;
                        }
                        
                        mutation.addedNodes.forEach(function (added_node) {
                            // Detect added favicon
                            if (added_node.type === 'image/x-icon') {
                                processIcon(rule.tab.icon);
                                
                                icon_changed_by_me = true;
                            }
                        });
                        
                        mutation.removedNodes.forEach(function (removed_node) {
                            // Detect removed favicon
                            if (removed_node.type === 'image/x-icon') {
                                processIcon(rule.tab.icon);
                                
                                icon_changed_by_me = true;
                            }
                        });
                    });
                }
            });
            
            // Observe when the website has changed the head so the script
            // will detect favicon manipulation (add/remove)
            if (document.querySelector('head link[rel*="icon"]') !== null) {
                observer_icon.observe(document.querySelector('head'), {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true,
                    attributeOldValue: true,
                    characterDataOldValue: true
                });
            }
        }
        
        // Protect the tab
        if (rule.tab.protected === true) {
            w.onbeforeunload = function () {
                return '';
            };
        }
        
        // Keep this tab unique
        if (rule.tab.unique === true) {
            chrome.runtime.sendMessage({
                action: 'setUnique',
                url_fragment: rule.url_fragment
            });
        }
        
        // Mute the tab
        if (rule.tab.muted === true) {
            chrome.runtime.sendMessage({ action: 'setMuted' });
        }
    };
    
    processPage();
    
    // Reverted #39
    // w.onhashchange = processPage;
    
});
