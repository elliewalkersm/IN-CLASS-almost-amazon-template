// API CALLS FOR AUTHORS

import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';

const dbUrl = firebaseConfig.databaseURL;
// GET AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json`)
    .then((response) => console.warn(Object.values(response.data)))
    .catch((error) => reject(error));
});
// DELETE AUTHOR
// CREATE AUTHOR
// UPDATE AUTHOR
// SEARCH AUTHORS

export default getAuthors;
