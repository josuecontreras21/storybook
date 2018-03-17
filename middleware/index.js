const Story = require('../models/story'); 

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.returnTo = req.originalUrl;
        res.redirect("/");
    },
    ownsStory: (req, res, next) => {
        if (req.isAuthenticated()) {
          Story.findById(req.params.story_id)
          .then(story =>{
            if (story.author._id.equals(req.user._id)) {
              next();
            } else {
              res.send("Upps! You need to be the owner of the CG to do that.");
            }
          })
          .catch(err => console.log(err));
        } else{
          res.send("Upps! You need to be logged in to do that.");
        }
      }
}