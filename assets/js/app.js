const movies = [
  {
    image:
      "https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg",
    title: "Batman",
    rating: 9.2,
    year: 2022,
    description:
      "Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população.",
    isFavorited: true,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg",
    title: "Avengers",
    rating: 9.2,
    year: 2019,
    description:
      "Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco.",
    isFavorited: false,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg",
    title: "Doctor Strange",
    rating: 9.2,
    year: 2022,
    description:
      "O aguardado filme trata da jornada do Doutor Estranho rumo ao desconhecido. Além de receber ajuda de novos aliados místicos e outros já conhecidos do público, o personagem atravessa as realidades alternativas incompreensíveis e perigosas do Multiverso para enfrentar um novo e misterioso adversário.",
    isFavorited: false,
  },
];

const ulCards = document.querySelector("[data-ulCard]");

function criarCardFilmes(image, title, rating, year, description, isFavorited) {
  const li = document.createElement("li");
  let imgUrl;
  let favorito;

  if (isFavorited) {
    imgUrl = `../assets/img/Vector.svg`;
    favorito = "Favorito";
  } else {
    imgUrl = `../assets/img/Heart.svg`;
    favorito = "Favoritar";
  }

  li.innerHTML = `
        <div class="content">
            <img src="${image}" alt="" />

            <div class="content_info">
              <p>${title} - ${year}</p>
              <div class="movie_info">
                <div class="movie_detals">
                  <img src="assets/img/Star.svg" alt="" />
                  <p>${rating}</p>
                </div>

                <div class="movie_detals">
                  <img src="${imgUrl}" alt="" />
                  <p>${favorito}</p>
                </div>
              </div>
            </div>
        </div>

        <p class="description">
            ${description}
        </p>
    `;

  return li;
}

movies.forEach((movie) => {
  ulCards.appendChild(
    criarCardFilmes(
      movie.image,
      movie.title,
      movie.rating,
      movie.year,
      movie.description,
      movie.isFavorited
    )
  );
});
