const express = require("express");
const cors = require("cors");
const fs = require("fs");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const loadData = () => {
  const rawData = fs.readFileSync("data.json");
  return JSON.parse(rawData);
};

app.get("/data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const category = req.query.category || "";
  const keyword = req.query.keyword || "";
  const sort = req.query.sort || "";

  const data = loadData();
  let filteredData = data;

  if (category) {
    filteredData = filteredData.filter(
      (item) =>
        item.Category && item.Category.toLowerCase() === category.toLowerCase()
    );
  }

  if (keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.Place_Name &&
        item.Place_Name.toLowerCase().includes(lowerCaseKeyword)
    );
  }

  if (sort === "rating") {
    filteredData.sort((a, b) => b.Rating - a.Rating);
  }

  const totalItems = filteredData.length;
  const start = (page - 1) * size;
  const end = start + size;

  const paginatedData = filteredData.slice(start, end);

  const response = {
    status: "success",
    page: page,
    size: size,
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / size),
    data: paginatedData,
  };

  res.json(response);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
