let gazedElemsStack = [];
elemPushed = false
function checkIfReady() {
    if (webgazer.isReady() && calibrationDone) {
        webgazer.setGazeListener(gaze => {
            if (!gaze) {
                console.count("No Gaze Data. Count: ")
                return
            }

            if (!calibrationDone)
                return

            if (!document.elementsFromPoint)
                return // Might not be supported in some browsers

            let gazedElem = document.elementFromPoint(gaze.x, gaze.y)
            if (gazedElem && "timeGazed" in gazedElem.dataset) {
                    gazeHandler.currGazeItem = gazedElem
                    gazeHandler.gazed = true
            }
            else if (gazedElem && gazedElem.tagName === "A") {
                let prevElem = gazedElemsStack[gazedElemsStack.length - 1]
                if (prevElem && 
                    gazedElem.getAttribute("href") === prevElem.getAttribute("href") && 
                    gazedElem.innerText === prevElem.innerText)
                    return
                let tmp = gazedElem.cloneNode(true)
                tmp.dataset.timeGazed = 0
                gazedElemsStack.push(tmp)
                elemPushed = true
            }
        })
    } else {
        setTimeout(checkIfReady, 100);
    }
}
setTimeout(checkIfReady,100);

let t = window.setInterval(() => {
    gazeHandler.updateDwell()

    if (!elemPushed)
        return

    if (gazedElemsStack.length > 5)
        gazedElemsStack.splice(0, 1)
    gazeElemsList.innerHTML = ""
    for (let i = gazedElemsStack.length -1 ; i > -1; i--) {
        let elem = gazedElemsStack[i]
        let li = document.createElement("li")
        li.appendChild(elem)
        gazeElemsList.appendChild(li)
    }
    elemPushed = false
}, 55)
