//Calculation Functions

function eightDecimals(n) {
    return Math.trunc(n * 10 ** 8) / 10 ** 8;
}

function add(a, b) {
    return eightDecimals(a + b);
}

function subtract(a, b) {
    return eightDecimals(a - b);
}

function multiply(a, b) {
    return eightDecimals(a * b);
}

function divide(a, b) {
    return eightDecimals(a / b);
}

function operate(op, a, b) {
    if (op == "+") {
        return add(a, b);
    } else if (op == "-") {
        return subtract(a, b);
    } else if (op == "*") {
        return multiply(a, b);
    } else if (op == "/") {
        return divide(a, b);
    } else {
        console.error("Operador No Identificado");
        return false;
    }
}

//Edit Screen When Pressing Buttons
NumberMaxLen = 15;

function scNotation() {
    if (screen.innerText.length >= NumberMaxLen) {
        screen.innerText = Number(screen.innerText).toExponential(10);
    }
}

function $(id) {
    return document.getElementById(id);
}

let screen = $("screen");
screen.innerText = "";

numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
        if (screen.innerText.length < NumberMaxLen) {
            if (screen.innerText != "" || event.target.innerText != "0") {
                screen.innerText += event.target.innerText;
            }
        }
    });
});

$("dot").addEventListener("click", (event) => {
    if (!screen.innerText.includes(".") && screen.innerText != "") {
        screen.innerText += ".";
    }
});

$("DEL").addEventListener("click", (event) => {
    screen.innerText = screen.innerText.slice(0, -1);
});

$("CLR").addEventListener("click", (event) => {
    screen.innerText = "";
    savedNumber = "";
    savedOperation = "";
});

//Operation Functions
let savedNumber = "";
let savedOperation = "";
let state = "";

function operationClick(symbol) {
    if (screen.innerText == "" && symbol == "-") {
        screen.innerText = "-";
    } else {
        if (savedOperation != "" && state != "WaitingForNumber") {
            let numberToOperate = Number(screen.innerText);
            savedNumber = operate(savedOperation, savedNumber, numberToOperate);
            screen.innerText = savedNumber;
            savedOperation = "";
            scNotation();
        }
        // Replace Last Number Functionality
        savedNumber = Number(screen.innerText);
        savedOperation = symbol;
        function deleteAndAdd() {
            screen.innerText = this.innerText;
            numberButtons.forEach((element) => {
                element.removeEventListener("click", deleteAndAdd);
                state = "Ready";
            });
        }
        function deleteAndAddKeyboard(event) {
            if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(event.key)) {
                screen.innerText = event.key;
                document.removeEventListener("keyup", deleteAndAddKeyboard);
                state = "Ready";
            }
        }
        document.addEventListener("keyup", deleteAndAddKeyboard);
        numberButtons.forEach((element) => {
            element.addEventListener("click", deleteAndAdd);
        });
        state = "WaitingForNumber";
    }
}

$("div").addEventListener("click", (event) => {
    operationClick("/");
});

$("mul").addEventListener("click", (event) => {
    operationClick("*");
});

$("sub").addEventListener("click", (event) => {
    operationClick("-");
});

$("add").addEventListener("click", (event) => {
    operationClick("+");
});

function equals() {
    if (savedOperation != "") {
        let numberToOperate = Number(screen.innerText);
        savedNumber = operate(savedOperation, savedNumber, numberToOperate);
        screen.innerText = savedNumber;
        savedOperation = "";
        scNotation();
        //New number functionality
        function deleteAndAdd() {
            screen.innerText = this.innerText;
            numberButtons.forEach((element) => {
                element.removeEventListener("click", deleteAndAdd);
            });
        }
        function deleteAndAddKeyboard(event) {
            if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(event.key)) {
                screen.innerText = event.key;
                document.removeEventListener("keyup", deleteAndAddKeyboard);
            }
        }
        document.addEventListener("keyup", deleteAndAddKeyboard);
        numberButtons.forEach((element) => {
            element.addEventListener("click", deleteAndAdd);
        });
    }
}
$("equals").addEventListener("click", equals);

//Keyboard Support

document.addEventListener("keyup", (event) => {
    key = event.key;
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(key)) {
        if (screen.innerText.length < NumberMaxLen) {
            if (screen.innerText != "" || event.target.innerText != "0") {
                screen.innerText += key;
            }
        }
    } else if (key == "Backspace") {
        screen.innerText = screen.innerText.slice(0, -1);
    } else if (key == "Enter" || key == "=") {
        equals();
    }
});
