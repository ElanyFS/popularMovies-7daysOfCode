import config from "./chave.js";

// https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1

const ulCards = document.querySelector("[data-ulCard]");
const inputFilme = document.querySelector('.inputFilme');
const form = document.querySelector('.content_formulario');

// Buscando todos os filmes
async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.apiKey}&language=pt-BR`;

  const filmes = await fetch(url);

  const { results } = await filmes.json();

  return results;
}

window.onload = async function () {
  const movies = await getMovies();

  movies.forEach((movie) => 
    ulCards.appendChild(criarElementoLi(movie))
  )
}

// Busca filmes por id
async function getByFilmes(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&query=${title}&language=en-US&page=1`;
  const filmes = await fetch(url);

  const {results} = await filmes.json();

  return results;
}

async function searchFilmes(){
  if (inputFilme.value != "") {
    ulCards.innerHTML = "";
    const movies = await getByFilmes(inputFilme.value);

    // console.log(movies);

    movies.forEach((movie) => {
      ulCards.appendChild(criarElementoLi(movie));
      console.log(movie);
    })
  } 
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  searchFilmes();
})

// Cria elemento li
function criarElementoLi(movie) {
  const { title, poster_path, vote_average, release_date, overview } = movie;
  const isFavorited = false;

  const dataFilme = new Date(release_date).getFullYear();
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const li = document.createElement("li");
  li.classList.add("content");

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

  return li
}