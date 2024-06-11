const Tag = require("../models/tag");

const addTag = async (req, res) => {
  try {
    const { tagName } = req.body;

    // Check if the tag already exists
    const existingTag = await Tag.findOne({ tagName });
    if (existingTag) {
      return res.status(400).json({ error: "Tag already exists" });
    }

    // Create a new tag
    const tag = new Tag({ name: tagName });
    await tag.save();

    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addTag };
