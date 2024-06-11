const Post = require("../models/post");
const Tag = require("../models/tag");

const getPosts = async (req, res, next) => {
  try {
    let { sort, page = 1, limit = 10, keyword, tag } = req.query;
    const filter = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ];
    }

    if (tag) {
      const tagDoc = await Tag.findOne({ name: tag });
      if (tagDoc) {
        filter.tags = tagDoc._id;
      } else {
        return res.status(404).send("Tag not found");
      }
    }

    const posts = await Post.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("tags");

    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: "BAD_REQUEST" });
  }
};

const addPost = async (req, res, next) => {
  try {
    const { title, desc, tags, category } = req.body;
    let imageUrl = "";

    if (req.file && req.file.cloudinaryUrl) {
      imageUrl = req.file.cloudinaryUrl;
    }

    const tagNames = tags.split(",");
    const tagDocs = await Tag.find({ name: { $in: tagNames } });

    if (tagDocs.length !== tagNames.length) {
      return res.status(400).json({ error: "One or more tags not found" });
    }

    const post = new Post({
      title,
      desc,
      image: imageUrl,
      tags: tagDocs.map((tag) => tag._id),
      category: category,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "BAD_REQUEST" });
  }
};

module.exports = { getPosts, addPost };
