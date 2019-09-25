var { userConfig } = require('./config.js');
const https = require('https');
const querystring = require('querystring');

async function getCurrentWeather(city) {
  // GET parameters
  var weather;

  const parameters = {
  	q: city,
    appid: '3af15ca018d28c3215f1cbfa2858713c',
  };

  const get_request_args = querystring.stringify(parameters);

  const options = {
    hostname: 'api.openweathermap.org',
    path: '/data/2.5/weather?' + get_request_args,
    method: 'GET',
  };
  console.log(options.path);

  // send request
  const request = https.request(options, (response) => {
  	// response from server
    console.log(`statusCode: ${response.statusCode}`);

    response.on('data', d => {
      //process.stdout.write(d);
      var obj = JSON.parse(d);
      weather = {
        city: city,
        unit: 'celsius',
        temperature: Math.round(obj.main.temp - 273.15),
      };
      console.log(weather);
    });
  });

  // In case error occurs while sending request
  request.on('error', (error) => {
  	console.log(error.message);
  });

  request.end();
  return weather;
}

async function getForecastWeather(city, timestamp) {
  // GET parameters
  var arrWeather = [];

  const parameters = {
  	q: city,
    appid: '3af15ca018d28c3215f1cbfa2858713c',
  };

  const get_request_args = querystring.stringify(parameters);

  const options = {
    hostname: 'api.openweathermap.org',
    path: '/data/2.5/forecast?' + get_request_args,
    method: 'GET',
  };
  console.log(options.path);

  //https://api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=3af15ca018d28c3215f1cbfa2858713c
  // send request
  const request = https.request(options, (response) => {
  	// response from server
    console.log(`statusCode: ${response.statusCode}`);

    response.on('data', d => {
      var obj = JSON.parse(d);
      //добавить ограничение по timestamp
      var arrTemperature = obj.list.filter( el => el.dt <= timestamp);
      arrTemperature.forEach( el => {
        arrWeather.push( {
          city: city,
          unit: 'celsius',
          temeperature: Math.round(el.main.temp - 273.15),
          timestamp: el.dt,
        });
      });
      console.log(arrWeather);
    });
  });

  // In case error occurs while sending request
  request.on('error', (error) => {
  	console.log(error.message);
  });

  request.end();
  return arrWeather;
}

module.exports = { getCurrentWeather, getForecastWeather };
