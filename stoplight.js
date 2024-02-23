//utility functions
async function delay(delayTime) {
    await new Promise((resolve) => setTimeout(resolve, delayTime));
}

//stoplights
const stoplightTopDOM = document.getElementById("stoplightTop");
const stoplightRightDOM = document.getElementById("stoplightRight");
const stoplightLeftDOM = document.getElementById("stoplightLeft");
const stoplightBottomDOM = document.getElementById("stoplightBottom");

const pedestrianStoplightTopDOM = document.getElementById("pedestrianStoplightTop");
const pedestrianStoplightRightDOM = document.getElementById("pedestrianStoplightRight");
const pedestrianStoplightLeftDOM = document.getElementById("pedestrianStoplightLeft");
const pedestrianStoplightBottomDOM = document.getElementById("pedestrianStoplightBottom");

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
        if (this.yellowLight) this.yellowLight.classList.add("active");
        this.activeLight = "yellow";
        if (this.yellowLight) await delay(1500)
        if (this.yellowLight) this.yellowLight.classList.remove("active");
        this.redLight.classList.add("active");
        this.activeLight = "red"
    }

    async setGreen() {
        if (this.yellowLight) this.yellowLight.classList.add("active");
        this.activeLight = "yellow";
        await delay(1500)
        this.redLight.classList.remove("active");
        if (this.yellowLight) this.yellowLight.classList.remove("active");
        this.greenLight.classList.add("active");
        this.activeLight = "green"
    }

    requestSignal() {
        this.pedestrianButton.classList.add("active");
    }

    async requestGreen() {
        const active = this.pedestrianButton.classList.contains("active");
        if (active) {
            this.pedestrianButton.classList.remove("active");
            await this.setGreen();
        }
    }

    bindButton(button) {
        this.pedestrianButton = button;
        button.addEventListener("click", () => {
            this.requestSignal()
        })
    }
}

const stoplightTop = new Stoplight(stoplightTopDOM);
const stoplightRight = new Stoplight(stoplightRightDOM);
const stoplightLeft = new Stoplight(stoplightLeftDOM);
const stoplightBottom = new Stoplight(stoplightBottomDOM);

const pedestrianStoplightTop = new Stoplight(pedestrianStoplightTopDOM);
const pedestrianStoplightRight = new Stoplight(pedestrianStoplightRightDOM);
const pedestrianStoplightLeft = new Stoplight(pedestrianStoplightLeftDOM);
const pedestrianStoplightBottom = new Stoplight(pedestrianStoplightBottomDOM);

//pedestrian buttons
const pedestrianStoplightBottomButton = document.getElementById('pedestrianStoplightBottomButton');
const pedestrianStoplightTopButton = document.getElementById("pedestrianStoplightTopButton");
const pedestrianStoplightLeftButton = document.getElementById("pedestrianStoplightLeftButton");
const pedestrianStoplightRightButton = document.getElementById("pedestrianStoplightRightButton");

pedestrianStoplightTop.bindButton(pedestrianStoplightRightButton);
pedestrianStoplightBottom.bindButton(pedestrianStoplightLeftButton);
pedestrianStoplightRight.bindButton(pedestrianStoplightBottomButton);
pedestrianStoplightLeft.bindButton(pedestrianStoplightTopButton);


async function stoplightsCycle() {
    stoplightTop.setRed();
    stoplightBottom.setRed();
    pedestrianStoplightTop.setRed();
    pedestrianStoplightBottom.setRed();
    await delay(3000);
    stoplightLeft.setGreen();
    stoplightRight.setGreen();
    pedestrianStoplightLeft.requestGreen();
    pedestrianStoplightRight.requestGreen();

    await delay(10000);

    stoplightLeft.setRed();
    stoplightRight.setRed();
    pedestrianStoplightLeft.setRed();
    pedestrianStoplightRight.setRed();
    await delay(3000);
    stoplightTop.setGreen();
    stoplightBottom.setGreen();
    pedestrianStoplightTop.requestGreen();
    pedestrianStoplightBottom.requestGreen();
}

setInterval(() => stoplightsCycle(), 30000);