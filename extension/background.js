/*
On page action click, navigate the corresponding tab to the cat gifs.
*/
browser.browserAction.onClicked.addListener(() => {
    var gettingActiveTab = browser.tabs.query(
        {active: true, currentWindow: true}
    );
    gettingActiveTab.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            message: 'This is the background script. Please relay the msg.'
        })
    })
    browser.tabs.executeScript({
        file: "/content_scripts/webgazer/webgazer.min.js"
    })
    .then(() => {
        gettingActiveTab.then(tabs => {
            browser.tabs.sendMessage(tabs[0].id, {
                message: "OK"
            })
        })
    })
    .then(() => browser.tabs.executeScript({
        file: "/content_scripts/startgaze.js"
    }
    ))
    .then(() => {
        gettingActiveTab.then(tabs => {
            browser.tabs.sendMessage(tabs[0].id, {
                message: "OK"
            })
        })
    })
    .catch((reason) => {
        console.error(reason)
        gettingActiveTab.then(tabs => {
            browser.tabs.sendMessage(tabs[0].id, {
                message: "Could not execute Webgazer. Reason: " + reason
            })
        })
    })
})
