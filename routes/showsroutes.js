const router = require("express").Router();
const path = require("path");
const showsController = require(path.join(
  __dirname,
  "../controllers/showscontroller"
));

//ROUTES
router.route("/").get(showsController.list);

router.route("/:id").get(showsController.idSession);

router.route("/:id/signup").get(showsController.authenticateSignup, showsController.idSignup);

module.exports = router;
