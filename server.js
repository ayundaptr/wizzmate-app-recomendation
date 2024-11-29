// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const app = express();
// const PORT = process.env.PORT || 8000;

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res
//     .status(500)
//     .json({ message: "Something went wrong!", error: err.message });
// });

// app.listen(PORT, () => {
//   console.log(`Server berjalan di localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Mengizinkan request dari domain lain
app.use(express.json()); // Untuk meng-parse JSON body pada request

// Route untuk autentikasi
app.use("/api/auth", authRoutes);

// Fungsi untuk memuat data dari file
const loadData = () => {
  const rawData = fs.readFileSync("data.json");
  return JSON.parse(rawData);
};

// Route untuk mendapatkan data dengan paginasi
app.get("/data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const data = loadData();

  const totalItems = data.length;

  const start = (page - 1) * size;
  const end = start + size;

  const paginatedData = data.slice(start, end);

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

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Server Listener
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
