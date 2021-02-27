// API CALLS FOR AUTHORS

import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';

const dbUrl = firebaseConfig.databaseURL;
// GET AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json`)
    .then((response) => {
      if (response.data) {
        const authorArray = Object.values(response.data);
        resolve(authorArray);
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});
// DELETE AUTHOR
// CREATE AUTHOR
const createAuthors = (authorsObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorsObject)
    .then((response) => {
      const body = { firebaseKey: response.data.key };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors().then((authorsArray) => resolve(authorsArray));
        });
    }).catch((error) => reject(error));
});

// UPDATE AUTHOR
// SEARCH AUTHORS

export { getAuthors, createAuthors };
