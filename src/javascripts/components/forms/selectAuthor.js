import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuthors } from '../../helpers/data/authorData';

const selectAuthor = (bookObject = {}) => {
  let domString = `<label for="author">Select an Author</label>
    <select class="form-control" id="author" required>
    <option value="">Select an Author</option>`;

  getAuthors(firebase.auth().currentUser.uid).then((authorsArray) => {
    authorsArray.forEach((author) => {
      if (author.firebaseKey === bookObject.author_id) {
        domString += `<option selected value="${author.firebaseKey}">${author.first_name} ${author.last_name}</option>`;
      } else {
        domString += `<option value="${author.firebaseKey}">${author.first_name} ${author.last_name}</option>`;
      }
    });

    domString += '</select>';

    document.querySelector('#select-author').innerHTML = domString;
  });
};

export default selectAuthor;
