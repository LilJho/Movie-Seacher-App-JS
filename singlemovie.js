const API_key = "b423a3c3d2be8c773b6ba757bb6cfccc";
const BASE_url = "https://api.themoviedb.org/3";
const row = document.querySelector(".single-movie");
const similar = document.querySelector(".similar-movies-row");
const IMG_url = "https://image.tmdb.org/t/p/w500";

console.log(window.location.href.split("/")[3].split("?")[1]);

const fetchData = async () => {
  const id = window.location.href.split("/")[3].split("?")[1];

  const responseSingle = await axios.get(
    `${BASE_url}/movie/${id}?api_key=${API_key}&language=en-US`
  );

  const responseSimilar = await axios.get(
    `${BASE_url}/movie/${id}/similar?api_key=${API_key}&language=en-US&page=1`
  );

  displayMovie(responseSingle.data);
  renderSimilarMovie(responseSimilar.data.results);
  console.log(response.data);
};

const displayMovie = (data) => {
  row.innerHTML = `
        <div class="single-movie-info">
        <h2>Title: </h2>
        <p id="stars">${data.title}</p>
        <h2>Genre: </h2>
        <p id="genre">${data.genres.map((genre) => genre.name)}</p>
        <h2>Release Date: </h2>
        <p id="Release">${data.release_date}</p>
        <h2>Rating: </h2>
        <p id="rating">${data.vote_average}</p>
        <h2>Story: </h2>
        <p id="story">${data.overview}</p>
        <a href="index.html">Go back</a>
    </div>
    <img src=${IMG_url + data.poster_path} alt="">
        `;
};

const renderSimilarMovie = (data) => {
  similar.innerHTML = data.map((similarID) => {
    return `
        <a href="singleMovie.html?${
          data.id
        }" onclick="return false" ondblclick="displayMovie(Data)" class="similar-movie">
        
        <img src="${IMG_url + similarID.poster_path}" alt="">
        <h3>${similarID.title}</h3>
        </a>
        `;
  });
};

fetchData();
