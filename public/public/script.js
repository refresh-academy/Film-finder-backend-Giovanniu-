const tmdbKey = 'b22aeb005afae2ccc4c16edfebbc202a';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const tmdbBaseUrlLocale = 'http://localhost:3000';
const requestEndpoint = "/genre/movie/list?";
const playBtn = document.getElementById('playBtn');
//TODO create a variable named getGenres and put it into an async method//
const originalFetch = window.fetch;
window.fetch = function (...args) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await originalFetch(...args);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }, 100);
  })
};

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const queryString = `?api_key=${tmdbKey}`;
  const url = tmdbBaseUrlLocale + genreRequestEndpoint + queryString;
  try {
    const response = await fetch(url)
    if (response.ok) { // 200 ---> ok --->204---> ok;
      console.log("Response json is: ", genresObj);
      const jsonResponse = await response.json();
      console.log("got response: ", jsonResponse)
      const genreList = jsonResponse["genres"];
      console.log("genres are: ", genreList);
      return genreList;
    }
  } catch (e) {
    console.log("API error: response no data", e);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const queryString = "?with_genres=" + selectedGenre + "&api_key=" + tmdbKey;
  const requestEndpoint = "/discover/movie";
  const url = tmdbBaseUrl + requestEndpoint + queryString;
  console.log(url);
  return await fetch(url)
    .then(response => {
      const responseObj = response.json();
      console.log("1111 responseObj ", responseObj);
      return responseObj;
    })
    .then(data => {
      console.log("1111 data ", data.results)
      return data.results;
    })
    .catch(error => {
      console.log("1111 ERRORE DI SISTEMA!!", error);
    });
}


const getMovieInfo = async (movie) => {
  console.log("Getting movie details for ", movie);
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl+movieEndpoint+requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Got movie info: ", jsonResponse);
      return jsonResponse;
    }
} catch (e) {
    console.log(" Error getting movie info: ", e);

  playBtn = document.getElementById()
}
};
//TODO Gets a list of movies and ultimately displays the info of a random movie from the list//

const showRandomMovie = async () => {
  const loadingElem = document.getElementById('loading')
  loadingElem.style.display = "block";
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies(); // prendo i films
  const randomMovie = await getRandomMovie(movies);  // ne seleziono uno
  // const info = await getMovieInfo(randomMovie);
  // displayMovie(info);
  displayMovie(randomMovie); // lo visualizzo

  // scarico i dettagli completi dei pprimi cinque film
  const movieDetails = await getMovieDetails(movies.slice(0, 5));
  displayCarousel(movieDetails); // visualizzo il carosello
};


getGenres().then(function (genres) {
  populategenresDropdown(genres);
});
//Nuova funzione per movie details;
const getMovieDetails = async (movie_id) => {
  const requestEndpoint = "/movie/";
  const queryString = "?api_key=" + tmdbKey;
  const urlToFetch = tmdbBaseUrl + requestEndpoint + movie_id + queryString;
  const response = await fetch(urlToFetch);
  const jsonResponse = await response.json();
  console.log("+++ Got movie details response", jsonResponse);
  return jsonResponse;
}

playBtn.onclick = showRandomMovie;
//costruisci carosello
const showCarousel = async (carouselMovies) => {
  console.log("@@@mostra carouselMovies: ", carouselMovies);

  const CarouselEl = document.getElementById("carousel");
  carouselMovies.forEach(async movie => {
    console.log("Movie : ", movie);
    //creo un Li
    const eleLI = document.createElement('li');
    //creo un IMG
    const eleImg = createCarouselMoviePoster(movie.poster_path);
    eleLI.appendChild(eleImg);
    const productionEl = document.createElement('h2');
    const movie_id = movie.id;
    //aspettare funzione; 
    const movieDetails = await getMovieDetails(movie_id);
    productionEl.innerText = movieDetails.production_companies[0].name;
    eleLI.appendChild(productionEl);
    CarouselEl.appendChild(eleLI); //aggiungo a Ul il nuovo LI/

  });
}
//merry christamss==happy new year!!!!
//welcome to my cities