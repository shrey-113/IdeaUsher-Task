const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: "ideausher_task" },
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error uploading image to Cloudinary" });
      }
      req.file.cloudinaryUrl = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
};

module.exports = cloudinaryUpload;
