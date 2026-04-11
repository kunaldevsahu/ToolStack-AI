import History from "../models/History.js";

// Fetch user history
export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while fetching history" });
  }
};
