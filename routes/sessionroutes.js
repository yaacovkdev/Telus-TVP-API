const router = require("express").Router();
const path = require("path");
const showController = require(path.join(
  __dirname,
  "../controllers/sessioncontroller"
));

//ROUTES
router.route("/:id").get(showController.authorize, showController.idSession);
router.route("/:id/signup").get(showController.authenticateSignup, showController.idSignup);


module.exports = router;