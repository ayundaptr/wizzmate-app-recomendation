const { predictDestination } = require("../services/mlService");

exports.getPrediction = async (req, res) => {
  try {
    const { userId, input } = req.body;
    const prediction = await predictDestination(input);
    res.status(200).json({ success: true, prediction });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Prediction failed", error });
  }
};
