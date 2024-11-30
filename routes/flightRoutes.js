const express = require("express");
const { loadFlights, filterAndSortFlights } = require("../model/flightModel");

const router = express.Router();

router.get("/", (req, res) => {
  const { travel_class, airline, sort_by } = req.query;
  let flights = loadFlights();
  const filteredFlights = filterAndSortFlights(flights, {
    travel_class,
    airline,
    sort_by,
  });
  res.json({ status: "success", data: filteredFlights });
});

module.exports = router;
