// Task model
let tasks = [
    {
        text: 'Learn js',
        id: '1'
    },
    {
        text: 'Learn angular',
        id: '2'
    }
];

// Get element list-group
let ul = document.querySelector('.list-group');

// tasks.forEach(task => {
//     let li = listTemplate(task);
//     // insertAdjacentElement
//     ul.insertAdjacentElement("afterbegin", li);
// });

tasks.forEach(task => ul.insertAdjacentElement("afterbegin", listTemplate(task)));

function listTemplate(task) {
    // Create element
    let li = document.createElement('li');
    // Add task text
    li.textContent = task.text;
    // Set id
    li.setAttribute('data-id', task.id);
    // Add class
    li.classList.add('list-group-item');
    // Return created li
    return li;
}

// AddTask
function addTask(text) {
    // Create task object
    const newTask = {text, id: String(tasks.length+1)};
    // Add task on tasks
    tasks.unshift(newTask);
    // Add li at ul
    ul.insertAdjacentElement("afterbegin", listTemplate(newTask))
}

// Delete task
function deleteTask(id) {

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }

    let list = document.querySelectorAll('.list-group-item');

    list.forEach(function (item) {
        let elId = item.getAttribute('data-id');
        if (elId === String(id)) {
            item.remove();
        }
    });
}

// Alert
function message(text) {

    let old = document.querySelector('.alert');
    if (old) {old.remove()}

    let mes = document.createElement('div');
    let place = document.querySelector('.container');
    mes.classList.add('alert', 'alert-info');
    mes.textContent = text;
    place.insertAdjacentElement("afterbegin", mes);

}







