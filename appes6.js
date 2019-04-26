// Book class
class Book {
    constructor(title, auther, isbn) {
    this.title = title;
    this.auther = auther;
    this.isbn = isbn;
    }
}

// UI class
class UI {
    addBookToList (book) {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // Instantiate col
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.auther}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
    }

    showAlert (message, className) {
    // Create div
    const div = document.createElement('div');
    // add class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parents
    // get form and div
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    //time out after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
    }
    deleteBook (target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
    }
    clearFields () {
    document.getElementById('title').value = '';
    document.getElementById('auther').value = '';
    document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store{
    static getBooks() {
        let books ;
        if (localStorage.getItem('books') === null ) {
            books = []
        }   else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            // add book to UI
            ui.addBookToList(book);
        });
    }

    static addBooks(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach(function(book, index) {
          if(book.isbn === isbn) {
            books.splice(index, 1);
          }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }
}

// DOM load event
document.addEventListener('DOMContentLoaded' , Store.displayBooks);

// Event Lisner for add book
document.getElementById('book-form').addEventListener('submit', function(e) {

    const title = document.getElementById('title').value,
          auther = document.getElementById('auther').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title, auther, isbn);

    // Instantiate UI
    const ui =new UI();

    // Validation
    if(title === '' || auther === '' || isbn === '') {
        //  Error alert
        ui.showAlert('Plaese fill all Fields', 'error');
    }   else {
            // Add Book To List
    ui.addBookToList(book);

    // Store book to local storage
    Store.addBooks(book);

    // show alert
    ui.showAlert('Book Added!', 'success')
    // Clear Fields
    ui.clearFields();
    }



    e.preventDefault();
});
// event listner for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui =new UI();
    
    ui.deleteBook(e.target);

    // remove from lS
    //Store.removeBooks(e.target.parentElement.previousSibling.textContant);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show alert
    ui.showAlert('Book Removed!', 'success')

    e.preventDefault();
});