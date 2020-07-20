window.applyKalmanFilter=true
window.saveDataAcrossSessions=true

function checkIfReady() {
    if (webgazer.isReady()) {
        webgazer.setRegression("ridge")
            .begin()
            .showPredictionPoints(true)
    }
    else {
        console.log("WebGazer not ready")
        setTimeout(checkIfReady, 100)
    }
}
setTimeout(checkIfReady, 100)

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
