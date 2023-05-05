const path = require("path");
const rootPath = __dirname;
const multer = require("multer");
const { nanoid } = import('nanoid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(rootPath, "public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

module.exports = {
    upload,
    rootPath,
    uploadPath: path.join(rootPath, "public/uploads"),
    db: {
        name: "akjol_api",
        url: "mongodb://localhost"
    }
};
