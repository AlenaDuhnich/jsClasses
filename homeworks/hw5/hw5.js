// 6. Создать две функции и дать им осмысленные названия:
// - первая функция принимает массив и колбэк
// - вторая функция (колбэк) обрабатывает каждый элемент массива
// Первая функция возвращает строку "New value:" и обработанный массив:

// firstFunc(['my' 'name', 'is', 'Trinity'], secondFunc) -> "New value: MyNameIsTrinity"
// firstFunc([10, 20, 30], secondFunc) -> "New value: 100, 200, 300"
// firstFunc([{age:45, name: 'John'}, {age: 20, name: 'Aaron'}], secondFunc) -> "New value: John is 45, Aaron is 20,"
// firstFunc(['abc', '123'], secondFunc) -> "New value: cba, 321," строки инвертируются
// firstFunc([1, 2, 3], function(number) {return number + 5 + ', ';}) -> "New value: 6, 7, 8,"

// Подсказка: secondFunc должна быть представлена функцией, которая принимает один аргумент (каждый элемент массива) и возращает результат его обработки.

function processArr(arr, handler) {
    let result = 'New value: ';

    for (let i = 0; i < arr.length; i++) {
        result += handler(arr[i]);
    }
    console.log(result.trim());
    return result.trim();
}

processArr(['my', 'name', 'is', 'Trinity'], function(char) {
    return char[0].toUpperCase() + char.slice(1);
});

processArr([10, 20, 30], function(num) {
    return (num *= 10) + ', ';
});

processArr([{age:45, name: 'John'}, {age: 20, name: 'Aaron'}], function(field) {
    return field.name + ' is ' + field.age + ', ';
});

processArr(['abc', '123'], function(rev) {
    newRev = '';
    for (let i = rev.length - 1; i >= 0; i--) {
        newRev += rev[i];
    }
    return newRev + ', ';
});

processArr([1, 2, 3], function(number) {
    return number + 5 + ', ';
});

// Переписать в виде своих функций методы every и some

let users = [
    {
        name: 'Denis',
        age: 16,
        balance: 250
    },
    {
        name: 'Ivan',
        age: 18,
        balance: 100
    }
];

function every(arr, func) {

    for (let i = 0; i < arr.length; i++) {
        if (!func(arr[i], i, arr)) {
            return false;
        }
    }
    return true;
}

let customEvery = every(users, (item, i, arr) => item.age <= 18);


function some(arr, func) {
    if (!Array.isArray(arr)) return new Error('First argument must be an array');
// не уверена, какие проверки надо использовать в этих случаях, на массив нашла такую как вариант, но явно из будущих областей, да и пишут, что не лучшая... если это не паблик коды, надо ли здесь проверять аргументы, их количество, пустые или нет... надо ли проверять, есть ли они вообще... наверно, всегда в зависимости от ситуации? и наверно вряд ли это делается через new Error в реальности?..

    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i], i, arr)) {
            return true;
        }
    }
    return false;
}

let customSome = some(users, (item, i, arr) => item.age <= 18);

console.log(customEvery, customSome);

// Массивы. Задачи
// 2. Отсортировать массив [2, 4, 7, 1, -2, 10, -9] в обратном порядке: [10, 7, 4, 2, 1, -2, -9]. Используйте функцию.

let arr = [2, 4, 7, 1, -2, 10, -9];

arr.sort(function (prev, next) {
    return prev - next;
}).reverse();

// 3. Написать функцию, которая принимает три аргумента: произвольный массив и два числа, первое из которых означает начальный номер элемента в массиве, второе - конечный номер. Функция должна вернуть новый массив, состоящий из элементов первой коллекции согласно аргументам (с - по): getNewArray(['a', 'b', 'c', 'd', 'e', 'f'], 2, 4) = ['c', 'd', 'e']
// Исходный массив не менять. Циклы не использовать

let arrSlice = ['a', 'b', 'c', 'd', 'e', 'f'];
let newSlice = [];

function getnewArray(arr, indFirst, indLast) {
    if (indLast > arr.length - 1) return new Error('The last index is more than array length');
    if (indFirst < 0) return new Error('The first index is less than array start');
    if (indFirst >= indLast) return new Error('It is impossible');

    return newSlice = arr.slice(indFirst, indLast + 1);
}

getnewArray(arrSlice, 2, 4);

console.log(newSlice, arrSlice);


// 8. Отсортируйте массив массивов так, чтобы вначале располагались наименьшие массивы (размер массива определяется его длиной): [[14,45], [1], ['a', 'c', 'd']] -> [[1], [14, 45], ['a', 'c', 'd']]

let arr2 = [[14, 45], [1], ['a', 'c', 'd']];

arr2.sort(function(prev, next) {
    return prev.length - next.length;
});

// 10. Есть массив объектов:
// [
//     {cpu: 'intel', info: {cores: 2, cache: 3}},
//     {cpu: 'intel', info: {cores: 4, cache: 4}},
//     {cpu: 'intel', info: {cores: 1, cache: 1}},
//     {cpu: 'intel', info: {cores: 3, cache: 2}},
//     {cpu: 'intel', info: {cores: 4, cache: 2}}
// ]
// Отсортировать их по возрастающему количеству ядер (cores).

let comps = [
    {cpu: 'intel', info: {cores: 2, cache: 3}},
    {cpu: 'intel', info: {cores: 4, cache: 4}},
    {cpu: 'intel', info: {cores: 1, cache: 1}},
    {cpu: 'intel', info: {cores: 3, cache: 2}},
    {cpu: 'intel', info: {cores: 4, cache: 2}}
];

comps.sort(function(prev, next) {
  return prev.info.cores - next.info.cores;
});

// 11. Создать функцию, которая будет принимать массив продуктов и две цены. Функция должна вернуть все продукты, цена которых находится в указанном диапазоне, и отсортировать от дешевых к дорогим:
// const products = [
//     {title: 'prod1', price: 5.2},
//     {title: 'prod2', price: 0.18},
//     {title: 'prod3', price: 15},
//     {title: 'prod4', price: 25},
//     {title: 'prod5', price: 18.9},
//     {title: 'prod6', price: 8},
//     {title: 'prod7', price: 0.19},
//     {title: 'prod8', price: 63}
// ];
// filterCollection(products, 15, 30) -> [{...price: 15}, {...price: 18.9}, {...price: 19}, {...price: 25}]

const products = [
    {title: 'prod1', price: 5.2},
    {title: 'prod2', price: 0.18},
    {title: 'prod3', price: 15},
    {title: 'prod4', price: 25},
    {title: 'prod5', price: 18.9},
    {title: 'prod6', price: 8},
    {title: 'prod7', price: 19},
    {title: 'prod8', price: 63}
];

function filterCollection(arr, priceFrom, priceTo) {

    let filterRes = arr.filter(function(product) {
        return priceFrom <= product.price && product.price <= priceTo;
    });

    return filterRes.sort(function(prev, next) {
        return prev.price - next.price;
    });
}

filterCollection(products, 15, 30);

// 2. На основе массива [1, 2, 3, 5, 8, 9, 10] сформировать новый массив, каждый элемент которого будет хранить информацию о числе и его четности:
// [{digit: 1, odd: true}, {digit: 2, odd: false}, {digit: 3, odd: true}...]

let arr3 = [1, 2, 3, 5, 8, 9, 10];
let newArr3 = [];

let numOddEven = arr3.map(function(element) {
    newArr3.push({digit: element, odd: element%2 == 0});
    return newArr3;
});

console.log(numOddEven);

// 5. Дан массив объектов, где каждый объект содержит информацию о букве и месте ее положения в строке {буква: "а", позиция_в_предложении: 1}:

// [{char: "a", index: 12}, {char: "w", index: 8}, {char: "Y", index: 10}, {char: "p", index: 3}, {char: "p", index: 2}, {char: "N", index: 6}, {char: " ", index: 5}, {char: "y", index: 4}, {char: "r", index: 13}, {char: "H", index: 0}, {char: "e", index: 11}, {char: "a", index: 1}, {char: " ", index: 9}, {char: "!", index: 14}, {char: "e", index: 7}]

// Напишите функцию, которая из элементов массива соберет и вернет строку, основываясь на index каждой буквы. Например:
// [{char: "i", index: 1}, {char: "H", index: 0}, {char: "!", index: 2}] -> "Hi!"

// Подсказка: вначале отсортируйте массив по index, затем используйте reduce() для построения строки.

let chars = [
    {char: "a", index: 12},
    {char: "w", index: 8},
    {char: "Y", index: 10},
    {char: "p", index: 3},
    {char: "p", index: 2},
    {char: "N", index: 6},
    {char: " ", index: 5},
    {char: "y", index: 4},
    {char: "r", index: 13},
    {char: "H", index: 0},
    {char: "e", index: 11},
    {char: "a", index: 1},
    {char: " ", index: 9},
    {char: "!", index: 14},
    {char: "e", index: 7}
];
let charStr = "";

function charsPos(arr) {
    return arr.sort(function(prev, next) {
        return prev.index - next.index;
    }).reduce(function(str, current) {
        return charStr = str + current.char;
    }, '');
}

charsPos(chars);
