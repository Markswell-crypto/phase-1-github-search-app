
// const form = document.getElementById("mygithubform")

// console.log(form)

//  form.addEventListener("submit", function(e){
//     e.preventDefault()

//     const search = document.getElementById("search").value
//     const searchName = search.split(" ").join("")
// console.log(search)
//     document.getElementById("result").innerHTML = ""

//     fetch("https://api.github.com/users/"+searchName)
//     .then((result) => result.json())
//     .then((userData) => {
// document.getElementById("result").innerHTML = `
//       <a target ="_blank" href="https://wwww.github.com/${searchName}"> 
//       <img src = "${userData.avatar_url}"/> </a>
// `
//     })
//  }) 
document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("github-form");
console.log(form)
form.addEventListener("submit", function(e) {
  e.preventDefault();
// Get the search keyword.
  const search = document.getElementById("search").value;
// Make the fetch request to the User Search Endpoint.
  fetch("https://api.github.com/search/users?q=" + search)
    .then((res) => res.json())
    .then((data) => {
// Display the search results.
      const userList = document.getElementById("user-list");
      userList.innerHTML = "";

      for (const user of data.items) {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <a href="${user.html_url}">
            <img src="${user.avatar_url}" alt="${user.login}" />
            ${user.login}
          </a>
        `;
        userList.appendChild(userItem);
      }
    });
});

// Add a click event listener to the user list.
const userList = document.getElementById("user-list");
userList.addEventListener("click", function(e) {
// Get the user login from the clicked element.
  const userLogin = e.target.getAttribute("href");
// Make the fetch request to the User Repos Endpoint.
  fetch("https://api.github.com/users/" + userLogin + "/repos")
    .then((response) => response.json())
    .then((repo) => {
// Display the user repository results.
      const reposList = document.getElementById("repos-list");
      reposList.innerHTML = "";

      for (const repo of repo) {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <a href="${repo.html_url}">
            ${repo.name}
          </a>
        `;
        reposList.appendChild(repoItem);
      }
    });
});
})