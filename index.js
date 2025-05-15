console.log("Hello wordl");
import cowsay from 'cowsay';
console.log(cowsay.say({
  text: "I'm a moooodule",
  e: "oO",
  T: "U "
}));
import yosay from 'yosay';
console.log(yosay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));
import express from 'express'
let app = express()

app.get('/genre/movie/list', (req, res) => {
  console.log(req.query)
  
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
  res.send(genres)
})
app.use(express.static('public'))
//app.listen(3000)
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import randomAnimalName from 'random-animal-name'
const animalName = randomAnimalName()
console.log(animalName)
import animal from '@fakerjs/animal';

console.log(animal());
//=> Snow Leopard

console.log(animal({ type: 'zoo' }));
//=> Snow Leopard

console.log(animal({ type: 'zoo', locale: 'en_US' }));
//=> Snow Leopard

// Allowed type: ocean, desert, grassland, forest, farm, pet, zoo
// Allowed locale: en_US 