let calibCount = {}
let totalCalibClicks = 0
let calibrationDone = true

window.applyKalmanFilter=true
window.saveDataAcrossSessions=true

window.addEventListener("load", () => {
    
    // start webgazer right at the top
    webgazer.setRegression("ridge")
        .begin()
        .showPredictionPoints(true)

    window.onbeforeunload = webgazer.end

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

                let elems = document.elementsFromPoint(gaze.x, gaze.y)
                if (!elems) {
                    return
                }

                try {
                    elems[0].classList.add("gazed_link")
                }
                catch(err) {
                    // console.log("No elems. Don't freak out.")
                }
                for (const elem of elems) {
                    if (elem && elem.tagName === "A")
                        if (gazeElemsList) {
                            let e = elem.cloneNode(true)
                            let li = document.createElement("li")
                            li.appendChild(e)
                            gazeElemsList.appendChild(li)
                            elem.innerText = "Gazed!"
                        }
                }
                
            })
        } else {
            if (!calibrationDone)
                console.count("Not ready. Calibrating: ")
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);

    let gazeTower = document.createElement("div")
    gazeTower.id = "gaze_tower"
    let gazeElemsList = document.createElement("ol")
    gazeElemsList.id = "gaze_tower_list"
    gazeTower.appendChild(gazeElemsList)
    document.body.appendChild(gazeTower)

    document.addEventListener("keydown", ev => {
        if (ev.ctrlKey && ev.key == ">") {
            webgazer.end()
        }
    })

    if (calibrationDone)
        return

    let calibContainer = document.createElement("div")
    calibContainer.id = "gaze_calibration_container"
    document.body.appendChild(calibContainer)
    
    let positions = [
        [10, 10], [50, 10], [90, 10],
            [30, 30], [70, 30], 
        [10, 50], [50, 50], [90, 50],
            [30, 70], [70, 70],
        [10, 90], [50, 90], [90, 90]
    ]
    for (let i = 0; i < positions.length; i++) {
        calibPoint = createCalibrationPoint("Calibrate x3", i)

        calibPoint.style.left = positions[i][0] + "%"
        calibPoint.style.top = positions[i][1] + "%"

        calibPoint.addEventListener("click", calibPointClicked)

        calibContainer.appendChild(calibPoint)
    }

    calibContainer.addEventListener("click", () => {
        // TODO: Make it so that this disappears with more elegance and info
        if (totalCalibClicks >= 3 * positions.length) {
            calibrationDone = true
            calibContainer.remove()
        }
    })


})

function createCalibrationPoint(txt, num) {
    let b = document.createElement("span")
    b.setAttribute("class", "calibration_point")
    b.setAttribute("id", `c_${num}`)
    //b.innerText = `${txt} ${("00" + num).slice(-2)}`
    b.innerText = `${txt}`
    return b
}

function calibPointClicked(ev) {
    let t = ev.target
    if (!calibCount[t.id])
        calibCount[t.id] = 0
    calibCount[t.id]++
    t.innerText = "Calibrate x" + (3 - calibCount[t.id])
    totalCalibClicks++
    if (calibCount[t.id] >= 3) {
        t.innerText = "Done!"
        t.removeEventListener("click", calibPointClicked)
    }
}
