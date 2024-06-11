const express = require("express");

const tagRouter = express.Router();

const { addTag } = require("../controllers/TagControllers");

tagRouter.post("/new", addTag);

module.exports = tagRouter;
