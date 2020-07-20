let calibrationDone = true
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
            for (let elem of elems) {
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
        setTimeout(checkIfReady, 100);
    }
}
setTimeout(checkIfReady,100);
