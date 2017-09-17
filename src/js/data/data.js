
var data = {
  order: ['timer', 'break'],
  data: {
    timer: {
      minutes: 25,
      seconds: 0,
      message: 'Focus on your task!',
      settings: {
        message: 'Pomodoro'
      }
    },
    break: {
      minutes: 5,
      seconds: 0,
      message: 'Time to take a break.',
      settings: {
        message: 'Break'
      }
    }
  }
};

module.exports = data;
