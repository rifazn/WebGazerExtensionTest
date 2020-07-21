window.applyKalmanFilter=true
window.saveDataAcrossSessions=true

webgazer.setRegression("ridge")
    .begin()
    .showPredictionPoints(true)

document.addEventListener("keydown", ev => {
    if (ev.ctrlKey && ev.key == ">") {
        webgazer.end()
    }
    else if (ev.ctrlKey && ev.key == "?") {
        webgazer.end()
        webgazer.clearData()
    }
})

// window.onbeforeunload = webgazer.end
