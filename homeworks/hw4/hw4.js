// Функции. Задачи

// 1. Создать функцию multiply, которая будет принимать любое количество чисел и возвращать их произведение:
// multiply(1, 2, 3) = 6(1 * 2 * 3)
// Если нет ни одного аргумента, вернуть ноль: multiply() = 0

function multiply() {
  let result = 1,
      max = arguments.length;
  if (max === 0) return 0;
  for (i = 0; i < max; i++) {
      result *= arguments[i];
  }
  return result;
}

let multRes = multiply(1, 2, 3);
let multEmpty = multiply();

console.log(multRes, multEmpty);

// 2. Создать функцию, которая принимает строку и возвращает строку-перевертыш: reverseString('test') = "tset".

function reverseString(text) {
    if (typeof text !== "string") return new Error('Text is not a string');
    if (!text.length) return new Error('Text is empty');
    let newText = '';
    for(let i = text.length - 1; i >= 0; i--) {
        newText += text[i];
    }
    return newText;
}

let revRes = reverseString('test');

console.log(revRes);

// 3. Создать функцию, которая в качестве аргумента принимает строку из букв и возвращает строку, где каждый символ разделен пробелом и заменен на юникод-значение символа:
// getCodeStringFromText('hello') = "104 101 108 108 111"
// подсказка: для получения кода используйте специальный метод

function getCodeStringFromText(text) {
    if (typeof text !== "string") return new Error('Text is not a string');
    if (!text.length) return new Error('Text is empty');

    let newText = '';

    for(let i = 0; i < text.length; i++) {
        if (isNaN(text[i])) {
            newText += text[i].charCodeAt() + ' ';
        }
    }
    return newText.trim();
}

let strCode = getCodeStringFromText('hello123');

console.log(strCode);