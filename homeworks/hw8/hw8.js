// this Задачи
// 1. Создать объект, который описывает ширину и высоту прямоугольника, а также может посчитать площадь фигуры:
// const rectangle = {width: ..., height: ..., getSquare: ...};

function getSquares() {
    return this.width * this.height;
}

const rectangle = {
    width: 100,
    height: 34,
    getSquares: getSquares
};

console.log(rectangle.getSquares());

// 2. Создать объект, у которого будет цена товара и его скидка, а также два метода: для получения цены и для расчета цены с учетом скидки:
// const price = {
// price: 10,
// discount: '15%',
// ...
// };
// price.getPrice(); // 10
// price.getPriceWithDiscount(); // 8.5

function getPrice() {
    return this.price;
}

function getPriceWithDiscount() {
    let disc = parseInt(this.discount, 10);
    return (10 * (100 - disc))/100;
}

const price = {
    price: 10,
    discount: '15%',
    getPrice,
    getPriceWithDiscount: getPriceWithDiscount
};

console.log(price.getPrice(), price.getPriceWithDiscount());


// 3. Дан объект и функция:
// const user = {name: 'Abraham'},
// getUserName = function() {...};
// Внесите в этот код такие изменения, чтобы можно было вызвать user.getName() и получить 'Abraham'

const user = {
    name: 'Abraham',
    getName: function() {
        return user.name;
    }
};

let res = user.getName();
console.log(res);


// 4. Создать объект, у которого будет поле высота и метод "увеличить высоту на один". Метод должен возвращать новую высоту.
// object.height = 10;
// object.inc(); // придумать свое название для метода
// object.height; // 11;

function increaseHeight() {
    return ++this.height;
}

const obj = {
    height: 10,
    increaseHeight
};

console.log(obj.height, obj.increaseHeight(), obj.height);

// 5. Создать объект "вычислитель", у которого есть числовое свойство "значение" и методы "удвоить", "прибавить один", "отнять один". Методы можно вызывать через точку, образуя цепочку методов:
// const numerator = {
// value: 1,
// double: function() {...},
// plusOne: function() {...},
// minusOne: function() {...}
// }
// numerator.double().plusOne().plusOne().minusOne();
// numerator.value // 3

const numerator = {
    value: 1,
    double: function() {
        this.value *= 2;
        return this;
    },
    plusOne: function() {
        this.value++;
        return this;
    },
    minusOne: function() {
        this.value--;
        return this;
    }
};

numerator.double().plusOne().plusOne().minusOne();

console.log(numerator.value);

// 6. const user = {name: 'Abraham'},
// otherUser = {
// name: 'John',
// getName: function() {return this.name;}
// }
// Разобрать и объяснить, что тут происходит

// user.getName(); //undefined
// пытается найти метод getName в переменной user, не находит, ошибка undefined

// user.getName = otherUser.getName;
// user.getName(); // 'Abraham'
// происходит одалживание метода у объекта otherUser и выполняется в контексте объекта user, user.name = 'Abraham'

// otherUser.getName(); // 'John'
// метод возвращает значение поля name в контексте объекта otherUser, otherUser.name = 'John'



// this. Задачи. Part 2
// 1. Что выведет код? Почему?

// function getList() {return this.list;}
// let users = {
// length: 4,
// list: ['Abraham', 'James', 'John', 'Steven']
// }
// getList(); // undefined
// функция не возвращает никакого значения
// функция вызвана сама по себе, и this равен глобальному объекту windows?

// users.getList = getList;
// users.getList(); // ['Abraham', 'James', 'John', 'Steven']
// возвращает значение поля list объекта users
// происходит одалживание метода и он выполняется в контексте объекта users

// getList.call(users); // ['Abraham', 'James', 'John', 'Steven']
// метод call вызывает функцию getList, устанавливая в качестве this для нее объект users


// 2. Создать объект с розничной ценой и количеством продуктов. Этот объект должен содержать метод для получения общей стоимости всех товаров (цена * количество продуктов).

const shop = {
    price: 20,
    quantity: 100,
    total: function() {
        return this.price * this.quantity;
    }
};
console.log(shop.total());

// 3. Создать объект из предыдущей задачи. Создать второй объект, который описывает количество деталей и цену за одну деталь. Для второго объекта нужно узнать общую стоимость всех деталей, но нельзя создавать новые функции и методы. Для этого "позаимствуйте" метод из предыдущего объекта.

const details = {
    quantity: 25,
    price: 120
};

details.total = shop.total;

console.log(details.total());

// 4. Даны объект и функция:
// let sizes = {width: 5, height: 10},
// getSquare = function() {return this.width * this.height};
// Не изменяя функцию или объект, получить результат функции getSquare для объекта sizes

let sizes = {width: 5, height: 10},
    getSquare = function() {return this.width * this.height};

let result = getSquare.call(sizes);

console.log(result);

// 5. Дан массив let numbers = [4, 12, 0, 10, -2, 4]. Используя ссылку на массив numbers и Math.min, найти минимальный элемент массива.

let numbers = [4, 12, 0, 10, -2, 4];

let min = Math.min.apply(null, numbers);

console.log(min);

// 6. const elements = {
// height: '15px',
// marginTop: '5px',
// marginBottom: '5px',
// getFullHeight: function() {
// return this.height + this.marginTop + this.marginBottom; // эта часть с ошибкой
// }
// };
// Исправить метод getFullHeight таким образом, чтобы можно было вычислить сумму трех слагаемых (высота плюс отступы).
// Для другого объекта block {height: '5px', marginTop: '3px', marginBottom: '3px'} вычислить полную высоту getFullHeight, используя для этого объект element. В объект ничего не дописывать.

const element = {
    height: '15px',
    marginTop: '5px',
    marginBottom: '5px',
    getFullHeight: function() {
        return parseInt(this.height) + parseInt(this.marginTop) + parseInt(this.marginBottom) + 'px';
    }
};

const block = {
    height: '5px',
    marginTop: '3px',
    marginBottom: '3px'
};

console.log(element.getFullHeight.call(block)); // 11px

// 7. let el = {
// height: 25,
// getHeight: function() {return this.height;}
// };
// let getElementHeight = el.getHeight;
// getElementHeight(); // undefined

// Измените функцию getElementHeight таким образом, чтобы можно было вызвать getElementHeight() и получить 25.

let el = {
    height: 25,
    getHeight: function() {return this.height;}
};

let getElementHeight = el.getHeight.bind(el);
console.log(getElementHeight());