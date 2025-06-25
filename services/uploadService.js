const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const auctionName = req.body.name;
    const auctionPath = path.join(__dirname, "../data/images", auctionName);

    fs.mkdir(auctionPath, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, auctionPath);
    });
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = upload;
