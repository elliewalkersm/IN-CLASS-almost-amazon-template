// API CALLS FOR AUTHORS
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';

const dbUrl = firebaseConfig.databaseURL;
// GET AUTHORS
const getAuthors = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      if (response.data) {
        const authorArray = Object.values(response.data);
        resolve(authorArray);
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getFavoriteAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
    .then((response) => {
      const favoriteAuthorsArray = Object.values(response.data);
      resolve(favoriteAuthorsArray);
    }).catch((error) => reject(error));
});
// DELETE AUTHOR
const deleteAuthor = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => getAuthors(userId).then((authorsArray) => resolve(authorsArray)))
    .catch((error) => reject(error));
});

// CREATE AUTHOR
const createAuthors = (authorsObject, userId) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorsObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors(userId).then((authorsArray) => resolve(authorsArray));
        });
    }).catch((error) => reject(error));
});

// GET SINGLE AUTHOR
const getSingleAuthor = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${authorId}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// UPDATE AUTHOR
const updateAuthor = (firebaseKey, authorObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${firebaseKey}.json`, authorObject)
    .then(() => getAuthors(firebase.auth().currentUser.uid)).then((authorsArray) => resolve(authorsArray))
    .catch((error) => reject(error));
});

// SEARCH AUTHORS

export {
  getAuthors, createAuthors, getFavoriteAuthors, deleteAuthor, getSingleAuthor, updateAuthor
};
