// FIXME: STUDENTS show your authors

const showAuthors = (array) => {
  document.querySelector('#add-button').innerHTML = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';
  document.querySelector('#store').innerHTML = '';
  // CREATE A BUTTON TO ADD BOOKS

  array.forEach((item) => {
    // FIXME: STUDENTS create cards for your authors
    document.querySelector('#store').innerHTML += `<div class="card">
    <div class="card-body" style="height: 180px;">
    <h5 class="card-title">${item.first_name}</h5>
    <h5 class="card-title">${item.last_name}</h5>
    <button class="btn btn-info" data-toggle="modal" data-target="#formModal" id="edit-author-btn--${item.firebaseKey}">Edit Author</button>
    <button class="btn btn-danger" id="delete-author--${item.firebaseKey}">Delete Author</button>
    </div>
  </div>`;
  });
};

const emptyAuthors = () => {
  document.querySelector('#store').innerHTML = '<h1>No Authors</h1>';
};

export { showAuthors, emptyAuthors };
