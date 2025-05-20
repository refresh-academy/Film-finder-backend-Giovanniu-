const express = require('express');
let app = express();
const fs = require('node:fs');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/movie/like', (req, res) => {
  console.log("Request body: ", req.body);
  const responseObj = { message: 'Data received successfully', yourData: req.body };
  res.status(200).json(responseObj);
});

/*const cowsay= require('cowsay');
console.log(cowsay.say({
  text: "I'm a moooodule",
  e: "oO",
  T: "U "
}));
const yosay= require('yosay');
console.log(yosay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));*/

app.get('/genre/movie/list', (req, res) => {
  console.log(req.query);

  const genres = {
    "genres": [
      {
        "id": 28,
        "name": "Adventure"//action
      },
      {
        "id": 12,
        "name": "Action"//adventure
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]

  }
  res.send(genres);
});

app.use(express.static('public'))
//app.listen(3000)
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// Allowed type: ocean, desert, grassland, forest, farm, pet, zoo
// Allowed locale: en_US 

//const genres = require('./data/genres_list.json');


app.get('/genre/movie/list', (req, res) => {
  console.log(req.query);
  const dataAsText = fs.readFileSync('data/genres.json', 'utf8');
  const genres = JSON.parse(dataAsText);
  res.send(genres)
})
app.get('/discover/movie', (req, res) => {
  console.log("/discover/movie params: ", req.query)
  const genreId = req.query.with_genres; // <-- SECURITY THREAT!
  const dataAsText = fs.readFileSync(`data/genre-movies-${genreId}.json`, 'utf8');
  const genreMovies = JSON.parse(dataAsText);
  res.send(genreMovies)
  // <-- SECURITY THREAT!
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // http://localhost:3000
})