// Задачи на циклы

// 1. Дана строка "I am in the easycode". Сделать первые буквы каждого слова в верхнем регистре. Использовать for или while

let str = "I am in the easycode";
let newStr = '';

for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ' && (str[i - 1] === ' ')) {
        newStr += str[i].toUpperCase();
    } else {
        newStr += str[i];
    }
}

// 2. Дана строка "tseb eht ma i". Используя циклы, сделать строку-перевертыш (то есть последняя буква становится первой, предпоследняя - второй и т.д.).

let strRev = "tseb eht ma i";
let newRev = '';

for (let i = strRev.length - 1; i >= 0; i--) {
    newRev += strRev[i];
}

// 3. Факториал числа - произведение всех натуральных чисел от 1 до n включительно: 3! = 3*2*1, 5! = 5*4*3*2*1. С помощью циклов вычислить факториал числа 10.

let res = 1;

for (let i = 1; i <= 10; i++) {
    res *= i;
}

// 4. Используя циклы, создать строку "Считаем до 10и: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10".

// 1й вариант

let strCount = "Считаем до 10и: ";
newCount = '';

for (i = 1; i <= 10; i++) {
    newCount = (strCount += i + ', ').slice(0, -2);
}

// или может 2й вариант...

let strCounter = "Считаем до 10и: ";

for (i = 1; i <= 10; i++) {
    strCounter += i + ((i < 10) ? ", ": "");
}

// 5. На основе строки "Javascript is a pretty good language" сделать новую строку, где каждое слово начинается с большой буквы, а пробелы удалены.

let strJoin = "JavaScript is a pretty good language";
let newJoin = "";
let pos, prev = 0;

while ((pos = strJoin.indexOf(' ', prev))!== -1) {
    newJoin += strJoin.slice(prev, pos);
    newJoin += strJoin[pos + 1].toUpperCase();
    pos += 1;
    prev = pos + 1;
}

if(prev < strJoin.length) {
    newJoin += strJoin.slice(prev, strJoin.length);
}

// 6. Найти все нечетные числа от 1 до 15 включительно и вывести их в консоль.

for (i = 2; i <= 15; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

console.log(newStr, newRev, res, newCount, strCounter, newJoin);

