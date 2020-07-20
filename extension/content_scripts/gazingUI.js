let gazeTower = document.createElement("div")
gazeTower.id = "gaze_tower"
gazeTower.innerHTML += "<h1>Possible Links</h1>"

let dwell = document.createElement("div")
dwell.innerHTML = "<p>Dwell</p>"
dwell.style.width = "100%"
dwell.style.backgroundColor = "white"

let dwellProgress = document.createElement("div")
dwellProgress.style.height = '40px'
dwellProgress.style.width = "1%"
dwellProgress.style.backgroundColor = "green"
dwell.appendChild(dwellProgress)

gazeTower.appendChild(dwellProgress)

let gazeElemsList = document.createElement("ol")
gazeElemsList.id = "gaze_tower_list"
gazeTower.appendChild(gazeElemsList)
document.body.appendChild(gazeTower)

let gazeHandler = {
    prevGazeItem:     undefined,
    currGazeItem:     undefined,
    gazed       :     false,
    timeDwelled :     0,
    toDwell     :     10,

    updateDwell() {
        if (this.gazed && this.currGazeItem) {
            if (!this.prevGazeItem)
                this.prevGazeItem = this.currGazeItem

            if (this.currGazeItem === this.prevGazeItem) {
                this.timeDwelled++
                let mult = 100 / this.toDwell
                dwellProgress.style.width = (mult * this.timeDwelled) % 101 + '%'
            }
            else {
                this.timeDwelled = 0
                this.prevGazeItem = this.currGazeItem
                dwellProgress.style.width = 1 + '%'
            }
            this.gazed = false
        }
    }
}

