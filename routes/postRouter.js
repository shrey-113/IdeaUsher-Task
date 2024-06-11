const express = require("express");

const postRouter = express.Router();

const { addPost, getPosts } = require("../controllers/postControllers");
const upload = require("../middlewares/multer");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");

postRouter.post("/new", upload.single("image"), cloudinaryUpload, addPost);

postRouter.get("/get", getPosts);

module.exports = postRouter;
