const express = require("express");
const app = express();
const rp = require("request-promise");
const fs = require("fs");
const RandomOrg = require("random-org");

app.use(express.json());

//My API key for Open Weather
const weatherKey = "c4ade069bc3f1dcd3d7be7e313f5276e";
// const weatherQuery =
//   "api.openweathermap.org/data/2.5/weather?lat=" +
//   lat +
//   "&lon=" +
//   lon +
//   "&appid=" +
//   weatherKey;

var random = new RandomOrg({ apiKey: "ab290bb8-4b1b-4c2a-9bd0-e84538ddc404" });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Takes in integer value from the webapp and stores it to be used in the random API query
app.get("/api/:number", (req, res) => {
  // if (typeof req.params.number !== "number") {
  //   res.send("Error Code 400: Invalid Query Parameters");
  // }
  let num = req.params.number * 2;
  random
    .generateIntegers({ min: -90, max: 90, n: num })
    .then(function(result) {
      console.log(result.random.data);
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      //I think, CHECK THIS BEFORE SUBMITTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      res.send("Error 505");
      //SERIOUSLY DONT FUCK UP SOMETHING THIS EASY
    });
});

// app.post("api/coordinates", (req, res) => {});

//Port stuff
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
