// Book Constructure
function Book(title, auther, isbn) {
    this.title = title;
    this.auther = auther;
    this.isbn = isbn;
}
// UI constructure
function UI() {}

// Add Book to list
UI.prototype.addBookToList = function(book) {
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

// Show Alert
UI.prototype.showAlert = function(message, className){
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



// Delete Book
UI.prototype.deleteBook = function (target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('auther').value = '';
    document.getElementById('isbn').value = '';
}



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
    // show alert
    ui.showAlert('Book Removed!', 'success')

    e.preventDefault();
});