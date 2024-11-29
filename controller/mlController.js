// Controller untuk Integrasi Machine Learning

const { predictDestination } = require("../services/mlService");

exports.getPrediction = async (req, res) => {
  try {
    const { userId, input } = req.body; // Input dari aplikasi mobile
    const prediction = await predictDestination(input); // Panggil service ML
    res.status(200).json({ success: true, prediction });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Prediction failed", error });
  }
};
