const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const printRouter = require("./print");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/users", usersRouter);
router.use("/print", printRouter);

module.exports = router;
