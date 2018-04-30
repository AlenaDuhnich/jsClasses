/*
Переменные. Задачи (var)
1. Придумайте название для переменных, которые описывают (let и const):
a. цену (может меняться)
  let price;
b. максимальное число (постоянное)
  const maxNum;
c. имя пользователя (постоянное)
  const username;
d. информация о юзере (может меняться)
  let userInfo;

2. Что будет в консоли:
  console.log(test);
  var test = 'string';
  Ответ: undefined

  var x = 'string';
  var x = 'string № 2';
  console.log(x);
  Ответ: string № 2

3. Что будет в консоли:
  console.log(test);
  let test = 'string';
  Ответ: ошибка с всплыванием, переменная не задекларирована.

  const x = 'string';
  x = 'string №2';
  console.log(x);
  Ответ: ошибка, значение константы неизменно.

  let someVariable = 15;
  let someVariable = 10;
  console.log(someVariable);
  Ответ: ошибка, двойная декларация.

 */

/* Строки, задачи */

let string = 'some test string';

// 1. Получить первую и последнюю буквы строки */

let res = string[0] + string[string.length -1];

// 2. Сделать первую и последнюю буквы в верхнем регистре

res = res.toUpperCase();

// 3. Найти положение слова 'string' в строке

let pos = string.indexOf('string');

// 4. Найти положение второго пробела

let secondSpace = string.lastIndexOf(' ');

// 5. Получить строку с 5-го символа длиной 4 буквы

let strSubstr = string.substr(4, 4);

// 6. Получить строку с 5-го по 9-й символы

let strSubstring = string.substring(4, 10);

// 7. Получить новую строку из исходной путем удаления последних 6-ти символов

let stringNew = string.slice(0, -6);

// 8. Из двух переменных а=20 и b=16 (где 20 и 16 - числа) получить переменную string,
// в которой будет содержаться текст "2016"

let a = 20;
let b = 16;
let sum = '' + a + b;

// Числа. Задачи

// 1. Получить число pi из Math и округлить его до 2-х знаков после точки

let numPi = Math.PI.toFixed(2);

// 2. Используя Math, найти максимальное и минимальное числа из представленного ряда 15, 11, 16, 12, 51, 12, 13, 51

let numMax = Math.max(15, 11, 16, 12, 51, 12, 13, 51);
let numMin = Math.min(15, 11, 16, 12, 51, 12, 13, 51);

// 3. Работа с Math.random:
// a. получить случайное число и округлить его до двух цифр после запятой

let numRandom = Math.random().toFixed(2);

// b. получить случайное целое число от 0 до Х

let min = 1;
let max = 17;
let numRow = Math.round(Math.random() * (max - min) + min);

// 4. Проверить результат вычисления 0.6 + 0.7 - как привести к нормальному виду (1.3)?

let result = ((0.6*10) + (0.7*10)) / 10;

// 5. Получить число из строки '100$'

let numFromString = parseInt('100$');

// Объект. Задачи

// 1. Создать объект с полем product, равным 'iphone'.

let productObj = {
    product: 'iphone'
};

// 2. Добавить в объект из предыдущей задачи поле price, равное 1000 и поле currency, равное 'dollar'.

productObj.price = 1000;
productObj.currency = 'dollar';

// 3. Добавить поле details, которое будет содержать объект с полями model и color (значения этим полям придумайте сами).

let det = {
    model: '8S',
    color: 'white'
};

productObj.details = det;

console.log(res, pos, secondSpace, strSubstr, strSubstring, stringNew, sum, numPi, numMax, numMin, numRandom, numRow, result, numFromString, productObj);