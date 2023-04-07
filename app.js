const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
}
// Creating a schema (similar to collection)
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'lol'],
  },
  rating: {
    type: Number,
  },
  review: String,
});
//New type of schema for the fruits

// Creating a model under the schema//
const Fruit = mongoose.model('Fruit', fruitSchema);
const kiwi = new Fruit({
  name: 'Kiwi',
  score: 10,
  review: 'The best fruit!',
});
const orange = new Fruit({
  name: 'Orange',
  score: 4,
  review: 'Too sour for me',
});
const banana = new Fruit({
  name: 'Banana',
  score: 3,
  review: 'Weird texture',
});
const cosaRara = new Fruit({
  name: 'CosasRara',
});
const dfitems = [kiwi, orange, banana, cosaRara];

app.get('/', function (req, res) {
  Fruit.find()
    .then((items) => {
      if (items.length === 0) {
        Fruit.insertMany(dfitems)
          .then(() => {
            console.log('Added');
            res.redirect('/');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.render('list', { ListTitle: 'Fruits', newListItems: dfitems });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/', function (req, res) {
  const item = req.body.newItem;
  dfitems.push(item);
  res.redirect('/');
});

app.listen(3000, function () {
  console.log('Running in Port 3000');
});
