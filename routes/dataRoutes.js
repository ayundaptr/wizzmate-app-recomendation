const express = require("express");
const { loadData, filterAndPaginateData } = require("../model/dataModel");

const router = express.Router();

router.get("/", (req, res) => {
  const { page = 1, size = 10, category, keyword, sort } = req.query;
  const data = loadData();
  const { totalItems, paginatedData } = filterAndPaginateData(data, {
    page,
    size,
    category,
    keyword,
    sort,
  });
  res.json({
    status: "success",
    page,
    size,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / size),
    data: paginatedData,
  });
});

module.exports = router;
