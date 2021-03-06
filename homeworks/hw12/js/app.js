// Class Book
class Book {
    constructor(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
    }
}

// Class UI
class UI {
    addBookToList(book) {
        // Get book list
        const list = document.querySelector('.book-list tbody');
        // Create markup
        const tr = `
      <tr>
        <td class="book-title">${book.title}</td>
        <td>${book.author}</td>
        <td>${book.id}</td>
        <td>
            <button class="waves-effect waves-light btn btn-del red right">Delete <i class="material-icons right">close</i></button>
        </td>
      </tr>
    `;
        list.insertAdjacentHTML('beforeend', tr);


    }

    // item здесь это кнопка удаления
    removeItem(item) {
        let title = item.closest('tr').cells[0].innerHTML;
        let res = confirm('Are you sure?');
        if(!res) {
            return false;
        }

        item.closest('tr').remove();

        return title;
    }

    showAlert(message, type) {
        // Create markup
        const alert = `
      <div class="card alert ${(type === 'error') ? 'red' : (type === 'success') ? 'green' : 'yellow'}">
        <div class="card-content white-text">
          <span class="card-title">${(type === 'error') ? 'Error' : (type === 'success') ? 'Success' : 'Warning'}</span>
          <p>${message}</p>
        </div>
      </div>
    `;

        // Get title
        const cardTitle = document.querySelector('.card-title');
        // Get button
        const btn = document.querySelector('form button');
        // Disabled btn
        btn.disabled = true;

        // Insert alert
        cardTitle.insertAdjacentHTML('afterend', alert);

        setTimeout(function () {
            document.querySelector('.alert').remove();
            btn.disabled = false;
        }, 3000);
    }
}

// Class Local Storage
class Store {
    getBooks() {
        let books;
        if(!localStorage.getItem('books')) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); // Перегоняем их из json в обычный массив
        }

        return books;
    }

    // удаляем книгу из локал строреджа, сравниваем по тайтлу
    removeBook(title) {
        let books = this.getBooks();

        books.some(function(item, i){
            if(item.title === title) {
                books.splice(i, 1);
                return true;
            }
            return false;
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

    addBook(book) {
        // Get books from localstorage
        const books = this.getBooks();
        // Add new book
        books.unshift(book);
        // Save localstorage
        localStorage.setItem('books', JSON.stringify(books));
        // 1. Получаем из хранилища книги
        // 2. Перегоняем их из json в обычный массив
        // 3. добавляем в полученный массив новую книгу
        // 4. перегоняем из обычного массива в json
        // 5. сохраняем в хранилище
    }

}

// Event DOMContentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
    // Создаем экземпляр класса Store
    const store = new Store();
    // Create ui
    const ui = new UI();
    // Получаем все книги из хранилища
    const books = store.getBooks();
    // Добавляем книги из хранилища в разметку
    books.forEach(book => ui.addBookToList(book));
});

// Event submit
document.forms['addBookForm'].addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const title = this.elements['book_title'].value,
        author = this.elements['book_author'].value,
        id = this.elements['book_id'].value;

    // Create book
    const book = new Book(title, author, id);
    // Create ui
    const ui = new UI();
    // Get Store
    const store = new Store();

    // Validate
    if (title === '' || author === '' || id === '') {
        // Show error
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to ui
        ui.addBookToList(book);
        // Show success message
        ui.showAlert('Book added!', 'success');
        // Add book to localstorage
        store.addBook(book);
    }
    document.forms['addBookForm'].reset();
});

// обрабатываем клик на кнопке удаления
// приходится использовать клик по всей таблице, иначе последней кнопки еще не существует
document.querySelector(".book-list").addEventListener('click', function (event){
    if(!event.target.classList.contains('btn-del')) {
        return;
    }

    let ui = new UI();
    let store = new Store();

    let title = ui.removeItem(event.target);
    if(title !== false) {
        store.removeBook(title);
        ui.showAlert('Book removed!', 'warning');
    }

});