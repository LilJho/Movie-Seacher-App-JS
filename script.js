//TMDB
const API_key = "api_key=b423a3c3d2be8c773b6ba757bb6cfccc";
const BASE_url = "https://api.themoviedb.org/3";
const API_url = BASE_url + "/discover/movie?sort_by=popularity.desc&" + API_key;
const IMG_url = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_url + "/search/movie?" + API_key;

getMovies(API_url);

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { poster_path, title, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <a href="singleMovie.html?${id}" onclick="return false" ondblclick="location=this.href">
        <img src="${IMG_url + poster_path}" alt="${title}">

        <h3 class="movie-title">${title}</h3>
        </a>
    `;

    main.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  }
});
