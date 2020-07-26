browser.runtime.onMessage.addListener(message => {
    if (message.message)
        console.log(message)
})
