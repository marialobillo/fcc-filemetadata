var express = require("express");
var cors = require("cors");
require("dotenv").config();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

// upload single file and get file info
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    res.status(200).json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});
