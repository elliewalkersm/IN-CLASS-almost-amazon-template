const authorInfo = (authorObj) => {
  document.querySelector('#add-button').innerHTML += `<h1 class="text-white">${authorObj.first_name} ${authorObj.last_name}'s Books</h1>`;
};

export default authorInfo;
