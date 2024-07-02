import config from "./chave.js";

async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.apiKey}&language=pt-BR`;

  const fetchMovies = await fetch(url);

  const {results}= await fetchMovies.json();

  return results;
}

const ulCards = document.querySelector("[data-ulCard]");

function criarCardFilmes(movie) {

  const {title, poster_path, vote_average, release_date, overview} = movie;
  const isFavorited = false;

  const dataFilme = new Date(release_date).getFullYear();

  const image = `https://image.tmdb.org/t/p/w500${poster_path}`

  const li = document.createElement("li");
  let imgUrl;
  let favorito;

  if (isFavorited) {
    imgUrl = `../assets/img/Vector.svg`;
    favorito = "Favorito";
  } else {
    imgUrl = `../assets/img/Heart.svg`;
    favorito = "Favoritar"
  }

  li.innerHTML = `
        <div class="content">
            <img src="${image}" alt="" />

            <div class="content_info">
              <p>${title} - ${dataFilme}</p>
              <div class="movie_info">
                <div class="movie_detals">
                  <img src="assets/img/Star.svg" alt="" />
                  <p>${vote_average}</p>
                </div>

                <div class="movie_detals">
                  <img src="${imgUrl}" alt="" />
                  <p>${favorito}</p>
                </div>
              </div>
            </div>
        </div>

        <p class="description">
            ${overview}
        </p>
    `;

  return li;
}

window.onload = async function () {
  const movies = await getMovies();
  movies.forEach((movie) => {
    ulCards.appendChild(criarCardFilmes(movie));
  });
};
