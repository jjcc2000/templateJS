const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
let Tasks = [];

app.get('/', function (req, res) {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var today = new Date();
  var currentDay = weekday[today.getDay()];
  res.render('list', { dayOfTheWeek: currentDay, Task: Tasks });
});

app.post('/', function (req, res) {
  let task = req.body.inputText;
  Tasks.push(task);
  res.redirect('/');
});

app.listen(3000, console.log('Running in the Server 3000'));
