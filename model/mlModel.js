// Machine Learning Model - Penampung Hasil Prediksi

const mongoose = require("mongoose");

const mlSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prediction: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MLPrediction", mlSchema);
