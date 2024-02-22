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

    toggleLight(color) {
        this.redLight.classList.remove("active");
        this.yellowLight.classList.remove("active");
        this.greenLight.classList.remove("active");
        if (color == "red") {
            this.redLight.classList.add("active");
        }
        if (color == "yellow") {
            this.yellowLight.classList.add("active");
        }
        if (color == "green") {
            this.greenLight.classList.add("active");
        }
        this.activeLight = color;
    }

    setRed() {
        this.greenLight.classList.remove("active");
        this.yellowLight.classList.add("active");
        this.activeLight = "yellow";
        setTimeout(() => {
            this.yellowLight.classList.remove("active");
            this.redLight.classList.add("active");
        }, 1000);
        this.activeLight = "red"
    }

    setGreen() {
        this.yellowLight.classList.add("active");
        this.activeLight = "yellow";
        setTimeout(() => {
            this.redLight.classList.remove("active");
            this.yellowLight.classList.remove("active");
            this.greenLight.classList.add("active");
        }, 1000);
        this.activeLight = "green"
    }
}

const stoplightTop = new Stoplight(stoplightTopDOM);
const stoplightRight = new Stoplight(stoplightRightDOM);
const stoplightLeft = new Stoplight(stoplightLeftDOM);
const stoplightBottom = new Stoplight(stoplightBottomDOM);