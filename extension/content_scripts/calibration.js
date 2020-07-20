let calibCount = {}
let totalCalibClicks = 0
let calibrationDone = false

// maybe will need document.onload once put in a web extension

/*if (calibrationDone)
    return*/

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
