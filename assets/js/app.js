import config from "./chave.js";

const ulCards = document.querySelector("[data-ulCard]");
const inputFilme = document.querySelector(".inputFilme");
const form = document.querySelector(".content_formulario");

// Buscando todos os filmes
async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.apiKey}&language=pt-BR`;

  const filmes = await fetch(url);

  const { results } = await filmes.json();

  return results;
}

async function getFilmes() {
  const movies = await getMovies();

  movies.forEach((movie) => ulCards.appendChild(criarElementoLi(movie)));
}

window.onload = async function () {
  getFilmes();
};

// Busca filmes por id
async function getByFilmes(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&query=${title}&language=en-US&page=1`;
  const filmes = await fetch(url);

  const { results } = await filmes.json();

  return results;
}

async function searchFilmes() {
  if (inputFilme.value != "") {
    ulCards.innerHTML = "";
    const movies = await getByFilmes(inputFilme.value);

    movies.forEach((movie) => {
      ulCards.appendChild(criarElementoLi(movie));
      console.log(movie);
    });
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  searchFilmes();
});

function favoriteButtonPressed(event, movie) {
  const imgFavorito = {
    favorito: "/assets/img/Vector.svg",
    notFavorito: "/assets/img/Heart.svg",
  };

  if (event.target.src.includes(imgFavorito.notFavorito)) {
    setFavorito(movie);
    event.target.src = imgFavorito.favorito;
  } else {
    removeFavorito(movie);
    event.target.src = imgFavorito.notFavorito;
  }
}

function setFavorito(movie) {
  const movies = getFavoritoLocalStorage() || [];

  movies.push(movie);

  const movieString = JSON.stringify(movies);

  localStorage.setItem("itensFavoritos", movieString);
}

function removeFavorito(movie) {
  const movies = getFavoritoLocalStorage() || [];

  const find = movies.find((movie) => movie.id == movie.id);

  const newMovies = movies.filter((movie) => movie.id != find.id);

  localStorage.setItem("itensFavoritos", JSON.stringify(newMovies));
}

function getFavoritoLocalStorage() {
  return JSON.parse(localStorage.getItem("itensFavoritos"));
}

function checkFavorito(id) {
  const movies = getFavoritoLocalStorage() || [];

  return movies.find((movie) => movie.id == id);
}

// Cria elemento li
function criarElementoLi(movie) {
  const { id, title, poster_path, vote_average, release_date, overview } =
    movie;
  let isFavorited = checkFavorito(id);

  const dataFilme = new Date(release_date).getFullYear();

  const li = document.createElement("li");
  li.classList.add("content");

  const divContent = document.createElement("div");
  divContent.classList.add("content");

  const imagem = document.createElement("img");
  imagem.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const divContentInfo = document.createElement("div");
  divContentInfo.classList.add("content_info");

  const contentInfoParagrafo = document.createElement("p");
  contentInfoParagrafo.innerHTML = `${title} - ${dataFilme}`;

  // -------------------------------------

  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie_info");

  // -------------------------------------
  // movie_detals

  const movieDetals = document.createElement("div");
  movieDetals.classList.add("movie_detals");

  const imagemStar = document.createElement("img");
  imagemStar.src = "assets/img/Star.svg";

  const paragrafoMovieInfo = document.createElement("p");
  paragrafoMovieInfo.innerHTML = `${vote_average}`;

  movieDetals.appendChild(imagemStar);
  movieDetals.appendChild(paragrafoMovieInfo);

  // --------------------------------------
  // movie_detals_favorito
  const movieDetalsFavorito = document.createElement("div");
  movieDetalsFavorito.classList.add("movie_detals_favorito");

  const imagemFavorito = document.createElement("img");
  imagemFavorito.src = isFavorited
    ? "../assets/img/Vector.svg"
    : "../assets/img/Heart.svg";
  imagemFavorito.addEventListener("click", (event) => {
    favoriteButtonPressed(event, movie);
  });

  const paragrafoFavorito = document.createElement("p");
  paragrafoFavorito.innerHTML = "Favorito";

  movieDetalsFavorito.appendChild(imagemFavorito);
  movieDetalsFavorito.appendChild(paragrafoFavorito);

  // --------------------------------------
  // movie_info

  movieInfo.appendChild(movieDetals);
  movieInfo.appendChild(movieDetalsFavorito);

  // --------------------------------------

  const contentParagrafo = document.createElement("p");
  contentParagrafo.classList.add("description");
  contentParagrafo.innerHTML = `${overview}`;

  // --------------------------------------
  // content_info

  divContentInfo.appendChild(contentInfoParagrafo);
  divContentInfo.appendChild(movieInfo);

  // --------------------------------------

  divContent.appendChild(imagem);
  divContent.appendChild(divContentInfo);

  // --------------------------------------

  li.appendChild(divContent);
  li.appendChild(contentParagrafo);

  return li;
}

document.addEventListener("DOMContentLoaded", () => {
  const inputCheckbox = document.querySelector("#inputCheckbox");

  inputCheckbox.addEventListener("change", () => {
    if (inputCheckbox.checked) {
      ulCards.innerHTML = ``;

      const movies = getFavoritoLocalStorage();

      movies.forEach((movie) => {
        ulCards.appendChild(criarElementoLi(movie));
        console.log(movie);
      });
    } else {
      ulCards.innerHTML = "";
      getFilmes();
    }
  });
});
