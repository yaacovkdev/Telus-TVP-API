const router = require("express").Router();
const path = require("path");
const showsController = require(path.join(__dirname, "../controllers/showscontroller"));

//ROUTES
router
  .route("/")
  .get(showsController.list);

module.exports = router;