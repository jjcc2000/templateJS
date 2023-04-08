const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    'mongodb+srv://johan:dJGYFsWkuHUxY9nw@cluster0.xehl4ka.mongodb.net/fruitsDB'
  );
}
// Creating a schema (similar to collection)
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'lol'],
  },
  score: {
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

//

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
        Fruit.find({})
          .then(function (foundItems) {
            res.render('list', {
              ListTitle: 'Fruits',
              newListItems: foundItems,
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/', function (req, res) {
  const newItem = new Fruit({
    name: req.body.newItem,
  });
  newItem
    .save()
    .then(() => {
      console.log(`${newItem} the new Fruit to the database`);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});
//When the POST method
app.post('/delete', function (req, res) {
  const checkedItemId = req.body.checkbox.trim();

  Fruit.findByIdAndRemove(checkedItemId)
    .then(() => {
      console.log('Succesfully deleted checked item from the database');
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, function () {
  console.log('Running in Port 3000');
});
