const fs = require("fs");

const loadFlights = () => {
  const rawData = fs.readFileSync("penerbangan.json");
  return JSON.parse(rawData);
};

const filterAndSortFlights = (flights, { travel_class, airline, sort_by }) => {
  let filteredFlights = flights;

  if (travel_class) {
    filteredFlights = filteredFlights.filter(
      (flight) =>
        flight.travel_class.toLowerCase() === travel_class.toLowerCase()
    );
  }

  if (airline) {
    filteredFlights = filteredFlights.filter((flight) =>
      flight.airline.toLowerCase().includes(airline.toLowerCase())
    );
  }

  if (sort_by === "price") {
    filteredFlights.sort((a, b) => a.price - b.price);
  } else if (sort_by === "duration") {
    filteredFlights.sort((a, b) => a.duration - b.duration);
  }

  return filteredFlights;
};

module.exports = { loadFlights, filterAndSortFlights };
