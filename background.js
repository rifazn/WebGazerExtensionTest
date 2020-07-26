function sendMessage(tabID, messageObj) {
    return browser.tabs.sendMessage(tabID, messageObj)
}

/*
On browser action click, load WebGazer in the current tab and run it
*/
browser.browserAction.onClicked.addListener(() => {

    var gettingActiveTab = browser.tabs.query(
        {active: true, currentWindow: true}
    );

    gettingActiveTab.then((tabs) => {
        sendMessage(tabs[0].id, {
            message: 'Extension started.'
        })
    })

    browser.tabs.executeScript({
        file: "/content_scripts/webgazer/webgazer.min.js"
    })
    .then(() => {
        gettingActiveTab.then(tabs => {
            sendMessage(tabs[0].id, {
                message: "WebGazer library loaded."
            })
        })
    })
    .then(() => browser.tabs.executeScript({
        file: "/content_scripts/startgaze.js"
    })
    )
    .then(() => {
        gettingActiveTab.then(tabs => {
            sendMessage(tabs[0].id, {
                message: "stargaze.js has run."
            })
        })
    })
    .catch((reason) => {
        console.error(reason)
        gettingActiveTab.then(tabs => {
            sendMessage(tabs[0].id, {
                message: "Could not execute Webgazer. Reason: " + reason
            })
        })
    })
})
