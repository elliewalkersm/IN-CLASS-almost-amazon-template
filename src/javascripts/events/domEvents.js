import addBookForm from '../components/forms/addBookForm';
import editBookForm from '../components/forms/editBookForm';
import editAuthorForm from '../components/forms/editAuthorForm';
import {
  createBook, deleteBook, getSingleBook, updateBook
} from '../helpers/data/bookData';
import { showBooks } from '../components/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import { showAuthors } from '../components/authors';
import {
  createAuthors, getSingleAuthor, updateAuthor
} from '../helpers/data/authorData';
import formModal from '../components/forms/formModal';
import { deleteAuthorBooks, authorBookInfo } from '../helpers/data/authorBooksData';
import authorInfo from '../components/authorInfo';

const domEvents = (userId) => {
  document.querySelector('body').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        const firebaseKey = e.target.id.split('--')[1];
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        uid: userId
      };

      createBook(bookObject, userId).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR EDITING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const firebaseKey = e.target.id.split('--')[1];
      formModal('Edit Book');
      getSingleBook(firebaseKey).then((bookObject) => editBookForm(bookObject));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
      };

      updateBook(firebaseKey, bookObject).then((booksArray) => showBooks(booksArray));

      $('#formModal').modal('toggle');
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        const authorId = e.target.id.split('--')[1];
        deleteAuthorBooks(authorId, userId).then((authorsArray) => showAuthors(authorsArray));
      }
    }

    // DELETING ALL AUTHOR'S BOOKS
    if (e.target.id.includes('author-name-title')) {
      const authorId = e.target.id.split('--')[1];
      authorBookInfo(authorId).then((authorInfoObj) => {
        showBooks(authorInfoObj.books);
        authorInfo(authorInfoObj.author);
      });
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        favorite: document.querySelector('#favorite').checked,
        uid: userId
      };

      createAuthors(authorObject, userId).then((authorArray) => showAuthors(authorArray));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR EDITING A AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      const firebaseKey = e.target.id.split('--')[1];
      formModal('Edit Author');
      getSingleAuthor(firebaseKey).then((authorObject) => editAuthorForm(authorObject));
    }

    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        favorite: document.querySelector('#favorite').checked,
        uid: userId
      };

      updateAuthor(firebaseKey, authorObject).then((authorsArray) => showAuthors(authorsArray));

      $('#formModal').modal('toggle');
    }
  });
};

export default domEvents;
