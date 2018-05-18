const fruits = [
    {
        name: "orange",
        weight: 150
    },
    {
        name: "pineapple",
        weight: 500
    },
    {
        name: "kiwi",
        weight: 100
    },
    {
        name: "apple",
        weight: 250
    },
    {
        name: "pear",
        weight: 200
    },
    {
        name: "mango",
        weight: 300
    },
    {
        name: "apple",
        weight: 99
    },
    {
        name: "apple",
        weight: 99
    },
    {
        name: "grapefruit",
        weight: 400
    },
    {
        name: "grapefruit",
        weight: 300
    },

];

for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].name.toLowerCase() === 'apple' && fruits[i].weight <= 100) {
        console.log(fruits[i]);
        break;
    }
}