const tmdbKey = 'b22aeb005afae2ccc4c16edfebbc202a';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const tmdbBaseUrlLocale='http://localhost:3000';
const requestEndpoint = "/genre/movie/list?";
const playBtn = document.getElementById('playBtn');
//TODO create a variable named getGenres and put it into an async method//
const originalFetch=window.fetch;
window.fetch = function(...args) {
return new Promise((resolve, reject) => {
setTimeout(async () => {
  try {
    const response=await originalFetch(...args);
    resolve(response);
  } catch (error) {
    reject(error);
  }
} , 100);
})
};

const getGenres = async () => {
const genreRequestEndpoint = '/genre/movie/list';
const queryString = `?api_key=${tmdbKey}`;
const url= tmdbBaseUrlLocale + genreRequestEndpoint + queryString;
  try {
    const response = await fetch(url)
    if (response.ok) { // 200 ---> ok --->204---> ok;
      const genresObj = await response.json();
      console.log("Response json is: ", genresObj);
      const genresArray = genresObj.genres;
      return genresArray;
    } else {
      console.log("API error: response no data")
      return []
    }
  } catch (error) {
    console.error(error)
    console.log("API error: response undefined");
  return []};
};

const getMovies = async () => {
  selectedGenre = getSelectedGenre();
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
  console.log("1111 end of getMovies");
}


const getMovieInfo = () => {

  //select a movie and show his average rating and release date
  playBtn = document.getElementById()
};
//TODO Gets a list of movies and ultimately displays the info of a random movie from the list//

const showRandomMovie = async () => {
  const loadingElem = document.getElementById('loading')
  loadingElem.style.display = "block";
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  // this is showSpinner();
  const listArray = await getMovies();
  if (listArray.length > 0) {
    loadingElem.style.display = "none";
  }
  console.log("showRandomMovie")
  const randomMovie = getRandomMovie(listArray);
  displayMovie(randomMovie);
  //hideSpinner();
  showCarousel(listArray.slice(0, 5));
};
// 1 scaricare lista dei film del genere selezionato
// this is getMovies(function (movies) {
//  console.log("Dentro De")
//  const movie = getRandomMovie(movies);
//  console.log("22222 showRandomMovie movie ", movie);
// 2 selezionare un film a caso tra quelli ottenuti

//TODO 3 visualizzare a schermo le informazioni del film selezionato 
//  displayMovie(movie);
// });


//getGenres().then(populateGenreDropdown);
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
    carousel.appendChild(eleLI); //aggiungo a Ul il nuovo LI/

  });
}
//merry christamss==happy new year!!!!
//welcome to my cities