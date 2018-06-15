// 1. Создать конструктор для производства автомобилей. Конструктор должен принимать марку автомобиля и возраст машины. Конструктор должен иметь метод, который возвращает марку и второй метод, который возвращает год производства машины (год текущий минус возраст машины, использовать Date для получения текущего года).
// var lexus = new Car('lexus', 2);
// lexus.получитьМарку(); // 'Lexus'
// lexus.получитьГодВыпуска(); // 2016 (2018 - 2)
// Марка машины всегда должна возвращаться с большой буквы!

function Car(model, age) {
    this.getModel = function() {
        if (model !== undefined && typeof model === 'string') {
            return this.model = model.charAt(0).toUpperCase() + model.slice(1);
        } else {
            return new Error('Please provide a string');
        }
    };

    this.getAge = function() {
        const currentYear = new Date().getFullYear();
        const carAge = currentYear - age;
        if (age !== undefined && typeof age === 'number') {
            return carAge;
        } else {
            return new Error('Please provide numbers');
        }
    }
}

var lexus = new Car('lexus', 2);
lexus.getModel(); // 'Lexus'
lexus.getAge(); // 2016

// 2. Написать конструктор, который умеет элементарно шифровать строки (например, сделать из строки строку-перевертыш, или заменить все символы их цифровым представлением, или любой другой метод). Конструктор при инициализации получает строку и имеет следующие методы:
// а. показать оригинальную строку
// b. показать зашифрованную строку
// c. стереть все данные - метод должен удалить все строки
// Строки не должны быть доступны через this, только с помощью методов.

function Encrypt(str) {
    this.viewOrig = function() {
        return this.str = str || '';
    };
    this.encryptStr = function() {
        let newRev = '';
        for (let i = this.str.length - 1; i >= 0; i--) {
            newRev += this.str[i];
        }
        return newRev;
    };
    this.clearStr = function() {
        return this.str = '';
    }
}

var str = new Encrypt('I am in the easycode');
str.viewOrig(); // 'I am in the easycode'
str.encryptStr(); // 'edocysae eht ni ma I'
str.clearStr(); // ''

// 3. Создать класс, который создает экземпляры, работающие со строкой, и имеет следующие свойства и методы:
// a. свойство "строка" будет содержать строку
// b. методы для получения и установки строки
// c. метод для получения длины строки
// d. при вызове toString() вернуть строку
// e. при приведении объекта к числу вернуть длину строки
// var str = new КлассСтрока('test');
// str.получить(); // 'test'
// +str; // 4
// str.toString(); // 'test'

function Str(str) {
    this.str = str || '';

    this.getValue = function() {
        return this.str;
    };

    this.strLength = function() {
        return this.str.length;
    };
    this.toString = function() {
        return this.str.toString();
    };

    this.valueOf = function() {
        return this.str.length;
    }
}


var str2 = new Str('test');
str2.getValue(); // 'test'
str2.strLength(); // 4
str2.toString(); // 'test'
+str2; // 4