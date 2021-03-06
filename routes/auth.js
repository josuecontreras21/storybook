const express = require("express");
const router = express.Router();
const passport = require("passport");
const { previousURI } = require("../middleware");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(req.session.returnTo || "/");
    req.session.returnTo = null;
  }
);
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
