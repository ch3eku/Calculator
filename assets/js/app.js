const btns = document.querySelectorAll('button')
const screen = document.getElementById('screen')
const screen2 = document.getElementById('screen2')

// function getFormattedNumber(num) {
//     if (num == "-") {
//         return "";
//     }
//     var n = Number(num);
//     var value = n.toLocaleString("en");
//     return value;
// }
// function reverseNumberFormat(num) {
//     return Number(num.replace(/,/g, ''));
// }

let number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let operator = ['+', '-', 'x', '÷', '^','%'];

for (let btn of btns) {
    btn.addEventListener('click', (e) => {
        let text = e.target.innerText;
        if (number.includes(text)) {
            if (text != '.') {
                if (screen.value === '0') {
                    screen.value = '';
                }
            }
            screen.value += text;
        }
        else if (operator.includes(text)) {
            if (screen.value === '' && screen2.value != '') {
                if (operator.includes(screen2.value.charAt(screen2.value.length - 1))) {
                    screen2.value = screen2.value.slice(0, -1);
                }
                screen2.value += text;
            }
            else if (screen.value != '' && screen2.value != '') {
                //eval first then add operator in screen2
                try {
                    let equation = screen2.value + screen.value;
                    equation = equation.replace("x", "*").replace("÷", "/").replace("^", "**");
                    screen.value = '';
                    screen2.value = eval(equation);
                    if (screen2.value === 'Infinity' || screen2.value === 'NaN')
                        throw "Can't devided by Zero";
                    if (screen2.value === 'undefined')
                        throw "Invalid Equation";
                    if (screen2.value)
                        screen2.value += text;
                }
                catch (e) {
                    screen2.value = '';
                    if (e instanceof SyntaxError) {
                        screen.value = "Invalid Equation";
                    }
                    else if (e instanceof ReferenceError) {
                        screen.value = "Invalid Equation";
                    }
                    else
                        screen.value = e;
                    setTimeout(() => {
                        screen.value = '0';
                    }, 1500)
                }
            }
            else {
                screen.value += text;
                screen2.value = screen.value;
                screen.value = '';
            }
        }
        else if (text === '=') {
            try {
                let equation = screen2.value + screen.value;
                equation = equation.replace("x", "*").replace("÷", "/").replace("^", "**");
                screen2.value = '';
                screen.value = eval(equation);
                if (screen.value === 'Infinity' || screen.value === 'NaN')
                    throw "Can't devided by Zero";
                if (screen.value === 'undefined')
                    throw "Invalid Equation";
            }
            catch (e) {
                if (e instanceof SyntaxError) {
                    screen.value = "Invalid Equation";
                }
                else if (e instanceof ReferenceError) {
                    screen.value = "Invalid Equation";
                }
                else
                    screen.value = e;
                setTimeout(() => {
                    screen.value = '0';
                }, 1500)
            }
        }
        else if (text === 'C') {
            screen.value = '0';
            screen2.value = '';
        }
        else if (text === '<') {
            if (screen.value != '0') {
                if (screen.value.length) {
                    screen.value = screen.value.substring(0, screen.value.length - 1);
                }
                else {
                    screen2.value = screen2.value.substring(0, screen2.value.length - 1);
                }
                if (screen.value === '' && screen2.value === '')
                    screen.value = '0';
            }
        }
    })
}