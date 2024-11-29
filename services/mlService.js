// Service untuk Integrasi ML

const axios = require("axios"); // Untuk komunikasi ke model ML

exports.predictDestination = async (input) => {
  const ML_API_URL = process.env.ML_API_URL || "http://localhost:3000/predict"; // URL model
  try {
    const response = await axios.post(ML_API_URL, { input });
    return response.data.prediction; // Ambil hasil prediksi
  } catch (error) {
    console.error("Error in ML prediction:", error.message);
    throw new Error("Failed to get prediction from ML model");
  }
};
