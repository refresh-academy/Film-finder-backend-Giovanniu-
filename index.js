console.log("Hello wordl");
import cowsay from 'cowsay';
console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));
import yosay from 'yosay';
console.log(yosay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));
import express from 'express'
let app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
