// Populate dropdown menu with all the available genres
const populategenresDropdown = (genres) => {
  const select = document.getElementById('genres')

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById('genres').value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById('likeOrDislikeBtns');
  btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  const movieAverageDiv = document.getElementById('voteAverage');
  const movieDataDiv = document.getElementById('releaseDate');
  moviePosterDiv.innerHTML = '';
  movieTextDiv.innerHTML = '';
  movieAverageDiv.innerHTML = '';
  movieDataDiv.innerHTML = '';

}

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('id', 'moviePoster');
  return posterImg;
};

// Create HTML for movie poster
const createCarouselMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('class', 'carouselMoviePoster');
  return posterImg;
};
//funzione che mostra la barra di caricamento
const showLoading = (loading) => {
  const barLoad = document.getElementById('loading');
  barra.style.display = 'block';
  barLoad.innerHTML=loading;
}
// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};
const createMovieAverage = (voteAverage) => {
  const overviewDetails = document.createElement('p');
  overviewDetails.setAttribute('id', 'Movieaverage');
  overviewDetails.innerHTML = voteAverage;
  return overviewDetails;
}
const createMovieData = (releaseDate) => {
  const overviewInfo = document.createElement('p');
  overviewInfo.setAttribute('id', 'Moviedata');
  overviewInfo.innerHTML = releaseDate;
  return overviewInfo;
}

const createMovieDetails = (Details) => {
  const moreInformation = document.createElement('h5');
  moreInformation.setAttribute('voteAverage', 'releaseDate')
  moreInformation.innerHTML = Details;
}

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};
  
// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  console.log("showing movie: ", movieInfo);
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');
  const movieAverageDiv = document.getElementById('voteAverage');
  const movieDataDiv = document.getElementById('releaseDate');


  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);
  const voteAverage = createMovieAverage(movieInfo.vote_average);
  const releaseDate = createMovieData(movieInfo.release_date);

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);
  movieAverageDiv.appendChild(voteAverage);
  movieDataDiv.appendChild(releaseDate);

  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};
