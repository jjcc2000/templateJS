exports.getDay = function getDay() {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const today = new Date();

  return weekday[today.getDay()];
};

//Asign the new Method to the Module
exports.getWholeDate = function getWholeDate() {
  const today = new Date();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  return today.toLocaleDateString('en-US', options);
};
