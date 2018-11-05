const Story = require("../models/story");

module.exports = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.returnTo = req.originalUrl;
    res.redirect("/auth/google");
  },
  ownsStory: function(req, res, next) {
    if (req.isAuthenticated()) {
      Story.findById(req.params.story_id)
        .then(story => {
          if (story.author._id.equals(req.user._id)) {
            return next();
          } else {
            res.send("Upps! You need to be the owner of the CG to do that.");
          }
        })
        .catch(err => console.log(err));
    } else {
      res.send("Upps! You need to be logged in to do that.");
    }
  },
  isPublic: function(req, res, next) {
    Story.findById(req.params.story_id)
      .then(story => {
        switch (story.status) {
          case "public":
            return next();
            break;
          default:
            if (!req.isAuthenticated()) res.redirect("/auth/google");
            else if (story.author._id.equals(req.user._id)) return next();
            else res.redirect("/");
            break;
        }
      })
      .catch(err => console.log(err));
  }
};
