const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_DEST);
  },
  filename: function (req, file, cb) {
    let extension = file.mimetype.match(/(?<=\/)(\w+)/)[1];
    cb(null, Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
