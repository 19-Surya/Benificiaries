function toggle() {
    var blur=document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
  }
  
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  
  
  // ======================================================
  
  
  // Form Class: Represents a Form
  class Book {
    constructor(fname, lname, rname,dbirth,bemail) {
      this.fname = fname;
      this.lname = lname;
      this.rname = rname;
      this.dbirth = dbirth;
      this.bemail = bemail;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.fname}</td>
        <td>${book.lname}</td>
        <td>${book.rname}</td>
        <td>${book.dbirth}</td>
        <td>${book.bemail}</td>
        <td><a href="#" class="fa-solid fa-pencil ms-3 text-primary delete"><i
        class="fa-solid fa-trash-can ms-3 text-danger"></i></a></td>`
      ;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#fname').value = '';
      document.querySelector('#lname').value = '';
      document.querySelector('#rname').value = '';
      document.querySelector('#dbirth').value = '';
      document.querySelector('#bemail').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(rname) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.rname === rname) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event: Display form
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a form
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const rname = document.querySelector('#rname').value;
    const dbirth = document.querySelector('#dbirth').value;
    const bemail = document.querySelector('#bemail').value;
  
    // Validate
    if(fname === '' || lname === '' || rname === ''|| dbirth === ''|| bemail === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate form
      const book = new Book(fname, lname, rname,dbirth,bemail);
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Show success message
      UI.showAlert('Book Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a form
  document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });
  
  
  