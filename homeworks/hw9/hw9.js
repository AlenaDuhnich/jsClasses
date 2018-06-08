// 1. Что выведет следующий код? Почему?
getBigName(userName);
function getBigName(name) {
    name = name + '';
    return name.toUpperCase();
}
var userName = 'Ivan';

// ничего не выведет, var всплывает, getBigName(userName) вернет 'IVAN', но нет никакого console.log и т.п.

// 2. Какое значение вернет функция test? Почему?
function test() {
    var name = 'Vasiliy';
    return getBigName(userName);
}
function getBigName(name) {
    name = name + '';
    return name.toUpperCase();
}
var userName = 'Ivan';
test();

// вернет 'IVAN', находит userName в глобальном окружении и отрабатывает...

// 3. Что выведет функция getFood? Почему?
var food = 'cucumber';
(function(){
    var food = 'bread';
    getFood();
})();

function getFood() {
    console.log(food);
}

// выведет cucumber, функция вызывается в анонимной функции, но... переменная food в лексическом окружении function getFood равна cucumber, взятому из глобального окружения

// Замыкания
// Какое значение вернет функция getDollar? Почему?

var dollar,
    getDollar;
(function() {
    var dollar = 0;
    getDollar = function() {
        return dollar;
    }
}());

dollar = 30;
getDollar();

// getDollar вернет 0, т.к. использует переменную dollar посредством замыкания, внешний вызов не сработает, т.к. в этом случае getDollar не является функцией, а лишь пустой переменной

// 2. Что будет выведено в консоль? Почему?
//
// var greet = 'Hello';
// (function() {
//     var text = " World";
//     console.log(greet + text);
// }());
// console.log(greet + text);

// 'Hello World' первый раз выведется при работе функции, второй раз консоль-лог отработать не сможет, т.к. переменная text объявлена только внутри анонимной функции и доступ к ней есть только внутри функции

// 3. Создайте функцию, которая бы умела делать:
// minus(10)(6); // 4
// minus(5)(6); // -1
// minus(10)(); // 10
// minus()(6); // 6
// minus()(); // 0

function minus(a) {
    currentDif = a;

    function func(b) {
        if (currentDif !== undefined) {
            currentDif -= b || 0;
        } else {
            currentDif = b || 0;
        }
        return currentDif;
    }
    return func;
}

minus(10)(6);
minus(5)(6);
minus(10)();
minus(0)(6);
minus()(6);
minus()();

// 4. Реализовать функцию, которая умножает и умеет запоминать возвращаемый результат между вызовами:

function MultiplyMaker(x) {
    return function(y) {
        return x *= y;
    };
}

const multiply = MultiplyMaker(2);

console.log(multiply(2));
console.log(multiply(1));
console.log(multiply(3));
console.log(multiply(10));

// 5. Реализовать модуль, который работает со строкой и имеет методы:
// а. установить строку
// i. если передано значение, то установить пустую строку
// ii. если передано число, число привести к строке
// b. получить строку
// c. получить длину строки
// d. получить строку-перевертыш

const stringModify = (function () {
        let str = '';

        function setString(value) {
            if (value !== undefined) {
                return str = value.toString();
            } else {
                return '';
            }
        }

        function getString() {
            return str;
        }

        function getStringLength() {
            return str.length;
        }

        function reverseString() {
            let newRev = '';
            for (let i = str.length - 1; i >= 0; i--) {
                newRev += str[i];
            }
            return newRev;
        }

        return {
            setString: setString,
            getString: getString,
            getStringLength: getStringLength,
            reverseString: reverseString
        }
    }
)();

stringModify.setString('abcde'); // 'abcde'
stringModify.getString(); // 'abcde'
stringModify.getStringLength(); // 5
stringModify.reverseString(); // 'edcba'


// 6. Создайте модуль "калькулятор", который умеет складывать, умножать, вычитать, делить и возводить в степень.
// Конечное значение округлить до двух знаков после точки (значение должно храниться в обычной переменной, не в this)
// модуль.установитьЗначение(10); // значение = 10
// модуль.прибавить(5); // значение += 5
// модуль.умножить(2); // значение *= 2
// модуль.узнатьЗначение(); // вывести в консоль 30 (здесь надо округлить)

// Также можно вызвать методы цепочкой:
// модуль.установитьЗначение(10).вСтепень(2).узнатьЗначение(); // 100

// 1st variant with function

const calc = (function() {
    let i = 0;
    function setValue(value) {
        if (value !== undefined && typeof value === 'number') {
            this.i = value;
            return this;
        } else {
            return 'Oops';
        }
    }

    function plusValue(x) {
        if (x !== undefined && typeof x === 'number') {
            this.i += x;
            return this;
        } else {
            return this.i;
        }
    }

    function minusValue(x) {
        if (x !== undefined && typeof x === 'number') {
            this.i -= x;
            return this;
        } else {
            return 'Oops';
        }
    }

    function multiplyValue(x) {
        if (x !== undefined && typeof x === 'number') {
            this.i *= x;
            return this;
        } else {
            return 'Oops';
        }
    }

    function divideValue(x) {
        if (x !== 0) {
            this.i /= x;
            return this;
        } else {
            return 'Your previous value is zero! Stop!'
        }
    }

    function degreeValue(x) {
        if (x !== undefined && typeof x === 'number') {
            this.i = Math.pow(this.i, x);
            return this;
        } else {
            return 'Oops';
        }
    }

    function knowValue() {
        let res = Math.round(this.i * 100)/100;
        return res;
    }

    return {
        setValue: setValue,
        plusValue: plusValue,
        minusValue: minusValue,
        multiplyValue: multiplyValue,
        divideValue: divideValue,
        degreeValue: degreeValue,
        knowValue: knowValue
    }
}
)();

calc.setValue(10).plusValue(5).minusValue(2).multiplyValue(2).divideValue(2).degreeValue(2).knowValue();


// 2nd variant with object
// who knows what is better... maybe if it's a module then the 1st variant is better

// const calc = {
//     i: 0,
//     setValue: function(value) {
//         if (value !== undefined && typeof value === 'number') {
//             this.i = value;
//             return this;
//         } else {
//             return 'Oops';
//         }
//     },
//     plusValue: function(x) {
//         if (x !== undefined && typeof x === 'number') {
//             this.i += x;
//             return this;
//         } else {
//             return this.i;
//         }
//     },
//     minusValue: function(x) {
//         if (x !== undefined && typeof x === 'number') {
//             this.i -= x;
//             return this;
//         } else {
//             return 'Oops';
//         }
//     },
//     multiplyValue: function(x) {
//         if (x !== undefined && typeof x === 'number') {
//             this.i *= x;
//             return this;
//         } else {
//             return 'Oops';
//         }
//     },
//     divideValue: function(x) {
//         if (x !== 0) {
//             this.i /= x;
//             return this;
//         } else {
//             return 'Your previous value is zero! Stop!'
//         }
//     },
//     degreeValue: function(x) {
//         if (x !== undefined && typeof x === 'number') {
//             this.i = Math.pow(this.i, x);
//             return this;
//         } else {
//             return 'Oops';
//         }
//     },
//     knowValue: function() {
//         let res = Math.round(this.i * 100)/100;
//         return res;
//     }
// };
//
// calc.setValue(10).plusValue(5).minusValue(2).multiplyValue(2).divideValue(2).degreeValue(2).knowValue();