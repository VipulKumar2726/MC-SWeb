const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controller/user");
const mediaController = require("../controller/media");
const upload = require("../middleware/mediaUpload");
const router = express.Router();

router.post("/upload", upload.single("file"), mediaController.uploadMedia);
router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin); 



module.exports = router;