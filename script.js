const i_red = document.getElementById("red");
const i_green = document.getElementById("green");
const i_blue = document.getElementById("blue");
const i_opacity = document.getElementById("Opacity");
const hex = document.getElementById("spanCode");
const hove = document.getElementsByName("inputs");

const s_red = document.getElementById("redVal");
const s_green = document.getElementById("greenVal");
const s_blue = document.getElementById("blueVal");
const s_Opacity = document.getElementById("opacityVal");

const h_div = document.querySelectorAll(".hidden");
const s_div = document.querySelectorAll(".range-group");

const BOX = document.getElementById("backDiv");
const SELECTOR = document.getElementById("selector");
const clParent = document.getElementById("Parent");
const clChild = document.getElementById("Child");

const fontSizeRange = document.getElementById("fontSizeRange");
const sizeValue = document.getElementById("sizeValue");

// Set default size
BOX.style.fontSize = fontSizeRange.value + "px";

// Store both colors separately
let boxColor = { r: 0, g: 0, b: 0, o: 100 };
let textColor = { r: 255, g: 255, b: 255, o: 100 };

let currentMode = "box";


// Apply color to div
function applyColor() {
    const r = parseInt(i_red.value);
    const g = parseInt(i_green.value);
    const b = parseInt(i_blue.value);
    const o = parseInt(i_opacity.value);
    const a = o / 100;
    updateText(r, g, b, o);
    checkColorName(r, g, b, o);

    const rgb = `rgba(${r},${g},${b},${a})`;

    if (currentMode === "box") {
        changeClass();
        BOX.style.backgroundColor = rgb;
        boxColor = { r, g, b, o };
        hexColor(r, g, b);
    } else if (currentMode === "text") {
        changeClass();
        BOX.style.color = rgb;
        textColor = { r, g, b, o };
        hexColor(r, g, b);
    } else {
        changeClass();
        fontSizeRange.addEventListener("input", function () {
            const size = this.value;
            BOX.style.fontSize = size + "px";
            sizeValue.textContent = size;
        });
    }
}

function changeClass() {
    if (currentMode === "box" || currentMode === "text") {
        h_div.forEach(ele => {
            ele.classList.add("hidden");
        });
        s_div.forEach(elem => {
            elem.classList.remove("hidden");
        });
    } else {
        h_div.forEach(ele => {
            ele.classList.remove("hidden");
        });
        s_div.forEach(elem => {
            elem.classList.add("hidden");
        });
    }
}

// When switching mode
SELECTOR.addEventListener("change", function () {
    currentMode = this.value;
    const color = currentMode === "box" ? boxColor : textColor;
    updatevalue(color.r, color.g, color.b, color.o);
    applyColor();
});

// Slider events
i_red.addEventListener("input", applyColor);
i_green.addEventListener("input", applyColor);
i_blue.addEventListener("input", applyColor);
i_opacity.addEventListener("input", applyColor);

function hexColor(r, g, b) {
    const a = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let i = r % 16;
    let j = parseInt(r / 16);
    let k = g % 16;
    let l = parseInt(g / 16);
    let m = b % 16;
    let n = parseInt(b / 16);
    hex.textContent = `#${a[j]}${a[i]}${a[l]}${a[k]}${a[n]}${a[m]}`;
}
hex.onclick = () => {
    navigator.clipboard.writeText(hex.textContent);
    BOX.textContent = "Hex Code Copied!";

    setTimeout(() => {
        BOX.textContent = "I'm a Div";
    }, 2000);
};
hex.addEventListener("mouseenter", () => {
    BOX.style.fontSize = "50px";
    BOX.textContent = "Click to Copy";
});
hex.addEventListener("mouseleave", () => {
    BOX.style.fontSize = sizeValue.textContent + "px";
    BOX.textContent = "I'm a Div";
});


clChild.onchange = () => {
    const rgbc = clChild.value;
    if (currentMode === "box") {
        const [r, g, b, o] = rgbc.match(/\d+/g);
        updateText(r, g, b, o);
        updatevalue(r, g, b, o);
        hexColor(r, g, b);
        boxColor = { r, g, b, o };
        applyColor();

    } else if (currentMode === "text") {
        BOX.style.color = clChild.value;
        const [r, g, b, o] = rgbc.match(/\d+/g);
        updateText(r, g, b, o);
        updatevalue(r, g, b, o);
        hexColor(r, g, b);
        textColor = { r, g, b, o };
        applyColor();
    } else {
        BOX.style.color = clSelect.value;
    }
};
function updateText(r, g, b, o) {
    s_red.textContent = r;
    s_green.textContent = g;
    s_blue.textContent = b;
    s_Opacity.textContent = o;
}
function updatevalue(r, g, b, o) {
    i_red.value = r;
    i_green.value = g;
    i_blue.value = b;
    i_opacity.value = o;
}
function checkColorName(r, g, b, o) {
    const rgbVal = `rgba(${r},${g},${b},${o})`;
    let a = 1;
    for (let group in colors) {
        const found = colors[group].find(col => col.rgb === rgbVal);
        if (found) {
            clParent.value = group;
            clChild.innerHTML = "";
            colors[group].forEach(element => {
                clChild.add(new Option(element.name, element.rgb));
            });
            clChild.value = found.rgb;
            clChild.name = found.name;
            break;
        }
        if (a == 11) {
            clParent.value = group;
            clChild.innerHTML = "";
            const element = colors[group][0];
            clChild.add(new Option(element.name, ""));
            break;
        }
        a++;
    }
}

for (let clrParent in colors) {
    clParent.add(new Option(clrParent, clrParent));
}
clParent.addEventListener("change", function () {
    clChild.innerHTML = "";
    colors[this.value].forEach(element => {
        clChild.add(new Option(element.name, element.rgb));
    });
});

// // Initial load
applyColor();
