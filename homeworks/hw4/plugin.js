// 4. Сделать функцию editTask для списка задач который мы начали делать на занятии. он должен принимать id задачи и новый текст находит в массиве задач задачу с таким же id и менять ее значение поля text.

// Task Manager
// Add, Edit, Delete
let todos = [
    {
        text: 'Learn JavaScript',
        id: 0
    },
    {
        text: 'Learn Angular',
        id: 1
    }
];

function addTask(text) {
    if (typeof text !== 'string') return new Error('text is not a string');
    if (!text.length) return new Error('text empty');

    // Create new task obj
    const newTask = {
        id: todos.length,
        text
    };

    // Add new task
    todos.push(newTask); // push, pop, unshift, shift

    return todos;
}

function deleteTask(id) {
    if (id !== 0 && !id) return new Error('id required');
    if (isNaN(id)) return new Error('id must be a number');
    id = Number(id);

    let todo;

    for (let i = 0; i < todos.length; i++ ) {
        if (todos[i].id === id) {
            todo = todos[i];
            todos.splice(i, 1);
            break;
        }
    }

    return todo || 'task not found';
}

function editTask(id, text) {
    if (id !== 0 && !id) return new Error('ID is required');
    if (isNaN(id)) return new Error('ID must be a number');
    id = Number(id);
    if (typeof text !== 'string') return new Error('text is not a string');
    if (!text.length) return new Error('text empty');

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].text = text;
            break;
        }
    }

    return todos;
}

// additional check... optional...not sure

// function editTask2(id, text) {
//     if (id !== 0 && !id) return new Error('ID is required');
//     if (isNaN(id)) return new Error('ID must be a number');
//     id = Number(id);
//     if (typeof text !== 'string') return new Error('text is not a string');
//     if (!text.length) return new Error('text empty');
//
//     if (todos[id] === id){
//         todos[id].text = text;
//     } else {
//         for (let i = 0; i < todos.length; i++) {
//             if (todos[i].id === id) {
//                 todos[i].text = text;
//                 break;
//             }
//         }
//     }
//     return todos;
// }