const express = require("express");
const app = express();
const rp = require("request-promise");
const fs = require("fs");

app.use(express.json());

//My API key for Open Weather
const weatherKey = "c4ade069bc3f1dcd3d7be7e313f5276e";

function getWeather(array) {
  for (i = 0; i < array.length; i++) {
    let lat = array[i].lat;
    console.log(lat);
    let lon = array[i].lon;
    let weatherQuery =
      "api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c4ade069bc3f1dcd3d7be7e313f5276e";
    // "api.openweathermap.org/data/2.5/weather?lat=" +
    // lat +
    // "&lon=" +
    // lon +
    // "&appid=" +
    // weatherKey;
    rp(weatherQuery).then(data => {
      console.log(data);
    });
  }
}

function coordinate(array) {
  const pointData = [];
  let pointIndex = 0;
  for (var i = 0; i < array.length; i += 2) {
    let latitude = array[i];
    let longitude = array[i + 1];
    pointData[pointIndex] = {
      lat: latitude,
      lon: longitude
    };
    pointIndex++;
  }
  return pointData;
}

app.get("/", (req, res) => {
  console.log("Hello world!");
  res.send("Hello World!");
});

//Takes in integer value from the webapp and stores it to be used in the random API query
app.get("/api/:number", (req, res) => {
  // if (typeof req.params.number !== "number") {
  //   res.send("Error Code 400: Invalid Query Parameters");
  // }
  let num = req.params.number * 2;
  let randQuery =
    "https://www.random.org/integers/?num=" +
    num +
    "&min=-90&max=90&col=1&base=10&format=plain&rnd=new";
  rp(randQuery)
    .then(body => {
      //Formatting the returned data into an array, last element of array was an empty string, so I popped it off before moving forward
      bundle = body.split("\n");
      bundle.pop();
      pack = coordinate(bundle);
      res.send(body);
      console.log(pack);
      return pack;
    })
    .catch(err => {
      console.log(err);
      //I think, CHECK THIS BEFORE SUBMITTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      res.send("Error 505");
      //SERIOUSLY DONT FUCK UP SOMETHING THIS EASY
    })
    .then(pack => {
      getWeather(pack);
    });
});

// app.post("api/coordinates", (req, res) => {});

//Port stuff
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
