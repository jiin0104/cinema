const axios = require("axios");

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWNmNjhiMGNmOGY1OGE0ZTQ4YzczNGI5ZGYyZGQ5ZiIsInN1YiI6IjY0YmUwOTU1MGVkMmFiMDBmZjg3NWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4mpSNxX0V7zyzOH-PJwXskAMWGFeOdtthnXRKyMFe58",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

  