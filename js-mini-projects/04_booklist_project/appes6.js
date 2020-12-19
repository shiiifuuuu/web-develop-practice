const _title = document.getElementById('title');
const _author = document.getElementById('author');
const _isbn = document.getElementById('isbn');
const _addBook = document.getElementById('add-book');
const _bookList = document.getElementById('book-list');
const _alert = document.getElementById('alert');

class Book{
   constructor(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

let colorError = '#fc070754';
let colorSuccess = '#19be0354';
let colorLight = '#e0dfdf';

initEventListener();

function initEventListener(){
   //document reload
   document.addEventListener('DOMContentLoaded', showBooks);
   //add-book
   _addBook.addEventListener('submit', addBook);
   //delete-book
   _bookList.addEventListener('click', deleteBook);
}

function getBooksFromLS(){
   let bookList;
   if(localStorage.getItem('books')===null){
      bookList = [];
   }else{
      bookList = JSON.parse(localStorage.getItem('books'));
   }
   return bookList;
}
function setBooksToLS(bookList){
   localStorage.setItem('books', JSON.stringify(bookList));
}
function loadBooksFromLS(){
   let bookList = getBooksFromLS();
   if(bookList!==[]){
      bookList.forEach(function(book){
         let tr = _createBookRow(book);
         _bookList.children[1].appendChild(tr);
      });
   }
}
function _createBookRow(book){

   const tr = document.createElement('tr');
   tr.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td>
      <a class="delete">
         <i class="fas fa-times"></i>
      </a>
   </td>
   `;
   // const tdTitle = document.createElement('td');
   // const tdAuthor = document.createElement('td');
   // const tdIsbn = document.createElement('td');
   // const tdDelete = document.createElement('td');
   // const a = document.createElement('a');
   // const i = document.createElement('i');

   // tdTitle.textContent = book.title;
   // tdAuthor.textContent = book.author;
   // tdIsbn.textContent = book.isbn;
   
   // a.className = 'delete';
   // i.className = 'fas fa-times';
   
   // a.appendChild(i);
   // tdDelete.appendChild(a);

   // tr.appendChild(tdTitle);
   // tr.appendChild(tdAuthor);
   // tr.appendChild(tdIsbn);
   // tr.appendChild(tdDelete);
   // console.log(tr);

   return tr;
}
function clearInputs(){
   _title.value = '';
   _author.value = '';
   _isbn.value = '';
}
function setBorderColor(color){
   _title.style.borderColor = color;
   _author.style.borderColor = color;
   _isbn.style.borderColor = color;
}

function addBook(e){
   if(_title.value === '' || _author.value === '' || _isbn.value === ''){
      setMessage('Field is empty! Please input properly.', colorError);
      setBorderColor(colorError);
      setTimeout(messageHide, 3000);
   }else{
      let bookList = getBooksFromLS();
   
      let book = new Book();
      book.title = _title.value;
      book.author = _author.value;
      book.isbn = _isbn.value;

      //checking book existence
      let bookExist = checkBookExistence(book);
      if(bookExist){
         setMessage('The book is already in your list!', colorError);
         setBorderColor(colorError);
         setTimeout(messageHide, 3000);
      }else{
         // adding book in UI
         let tr = _createBookRow(book);
         _bookList.children[1].appendChild(tr);
         setMessage('Book added to your list.', colorSuccess);
         setBorderColor(colorSuccess);
         setTimeout(messageHide, 3000);

         // saving to local storage
         bookList.push(book);
         setBooksToLS(bookList);
      }
   }

   e.preventDefault();
}
function setMessage(msg, color){
   _alert.style.opacity = '100';
   _alert.textContent = msg;
   _alert.style.backgroundColor = color;
}
function messageHide(){
   _alert.style.opacity = '0';
   _alert.style.backgroundColor = '';
   clearInputs();
   setBorderColor(colorLight);
}
// console.log(_bookList.children[1]);
// console.log(localStorage.getItem('books')!==null);
function showBooks(e){
   loadBooksFromLS();

   e.preventDefault();
}
function deleteBook(e){
   //removing from UI
   let del = e.target.parentElement;
   let book = e.target.parentElement.parentElement.parentElement;
   if(del.classList.contains('delete')){
      book.remove();
   }
   let title = book.children[0].textContent;
   let author = book.children[1].textContent;
   let isbn = book.children[2].textContent;
   //removing from LS
   let bookList = getBooksFromLS();
   bookList.forEach(function(book, index){
      if(book.title === title && book.author === author && book.isbn === isbn){
         // console.log(index);
         bookList.splice(index,1);
      }
   });
   setBooksToLS(bookList);

   // console.log(book.childNodes[0].textContent);
   // console.log(e.target.parentElement.classList.contains('delete'));
      // console.log(e.target.parentElement.parentElement.parentElement);

   e.preventDefault();
}

function checkBookExistence(book){
   let bookList = getBooksFromLS();
   let bookExist = false;
   bookList.forEach(function(item){
      if(item.title.toLowerCase === book.title.toLowerCase && item.author.toLowerCase === book.author.toLowerCase && item.isbn.toLowerCase === book.isbn.toLowerCase){
         bookExist = true;
      }
   });
   return bookExist;
}
