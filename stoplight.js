//utility functions
async function delay(delayTime) {
    await new Promise((resolve) => setTimeout(resolve, delayTime));
}

//stoplights
const stoplightTopDOM = document.getElementById("stoplightTop");
const stoplightRightDOM = document.getElementById("stoplightRight");
const stoplightLeftDOM = document.getElementById("stoplightLeft");
const stoplightBottomDOM = document.getElementById("stoplightBottom");

class Stoplight {
    constructor(stoplight) {
        this.DOMObject = stoplight;
        this.redLight = stoplight.querySelector(".red-stoplight");
        this.yellowLight = stoplight.querySelector(".yellow-stoplight");
        this.greenLight = stoplight.querySelector(".green-stoplight");
    }

    static {
        this.activeLight = "red";
    }

    async setRed() {
        this.greenLight.classList.remove("active");
        this.yellowLight.classList.add("active");
        this.activeLight = "yellow";
        await delay(1000)
        this.yellowLight.classList.remove("active");
        this.redLight.classList.add("active");
        this.activeLight = "red"
    }

    async setGreen() {
        this.yellowLight.classList.add("active");
        this.activeLight = "yellow";
        await delay(1000)
        this.redLight.classList.remove("active");
        this.yellowLight.classList.remove("active");
        this.greenLight.classList.add("active");
        this.activeLight = "green"
    }
}

const stoplightTop = new Stoplight(stoplightTopDOM);
const stoplightRight = new Stoplight(stoplightRightDOM);
const stoplightLeft = new Stoplight(stoplightLeftDOM);
const stoplightBottom = new Stoplight(stoplightBottomDOM);

async function runStoplights() {
    stoplightTop.setRed();
    stoplightBottom.setRed();
    await delay(3000);
    stoplightLeft.setGreen();
    stoplightRight.setGreen();
    await delay(10000);
    stoplightLeft.setRed();
    stoplightRight.setRed();
    await delay(3000);
    stoplightTop.setGreen();
    stoplightBottom.setGreen();
}

runStoplights()

setInterval(() => runStoplights(), 20000);