console.log("Hello wordl");
/*const cowsay= require('cowsay');
console.log(cowsay.say({
  text: "I'm a moooodule",
  e: "oO",
  T: "U "
}));
const yosay= require('yosay');
console.log(yosay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));*/
const express = require('express');
let app = express();

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
      }]
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
const fs = require('fs');
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