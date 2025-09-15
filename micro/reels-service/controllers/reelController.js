const Reel = require("../models/Reel");

exports.createReel = async (req, res) => {
  try {
    const { title, videoUrl } = req.body;

    const reel = await Reel.create({
      title,
      videoUrl,
      userId: req.user.id,
      likes: [],
      comments: []
    });

    res.status(201).json({ msg: "Reel created", reel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReelById = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ msg: "Reel not found" });
    res.json(reel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
