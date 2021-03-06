const editAuthorForm = (authorObject) => {
  document.querySelector('#modal-body').innerHTML = `
    <form id="edit-author-form" class="mb-4">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" class="form-control" id="first_name" aria-describedby="firstName" placeholder="Enter First Name" value="${authorObject.first_name}" required>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" class="form-control" id="last_name" placeholder="Last Name" value="${authorObject.last_name}" required>
      </div>
      <div class="form-check mb-2">
        <input type="checkbox" class="form-check-input" id="favorite" ${authorObject.favorite && 'checked'}>
        <label class="form-check-label" for="favorite">Favorite?</label>
      </div>
      <button type="submit" id="update-author--${authorObject.firebaseKey}" class="btn btn-success">Update Author</button>
    </form>`;
};

export default editAuthorForm;
