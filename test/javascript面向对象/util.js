function show(o) {
    console.log("\n", "\n", "\n", o, "\n", "\n", "\n", "\n", "\n")
}

function ranInt(max, min) {
    if (min > max) {
        var mid = max;
        max = min;
        min = mid;
    }
    return parseInt(Math.random() * (max + 1 - min) + min)
}


let color_g = ""

function $$$(str, color) {
    if (str) {
        document.write(`<p>${str}</p>`);
    } else {
        str = "<---"
    }
    if (!color) {
        let num = ranInt(1, 12) * 30
        color = "hsl(" + num + ",50%,50%)"
    }
    color_g = color;
    console.log(`%c\n${str}-----------`, `color:${color};font-size:20px;font-weight:700;`)
}


function ___(str = "--->", color) {
    if (!color) {
        color = color_g
    }
    console.log(`%c-----------${str}\n`, `color:${color};font-size:20px;font-weight:700;`)
}
