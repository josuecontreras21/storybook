const express = require('express');
const router = express.Router({mergeParams:true});

const Story = require('../models/story'); 
const Comment = require('../models/comment');
const User = require('../models/user');
const middleware = require('../middleware');

router.route('/')
//show public stories
.get((req, res)=>{
    Story.find({status:"public"}).exec()
    .then((stories) => {
        res.render('stories', {stories: stories})
    })
    .catch(err => console.log(err));
})
//create new story
.post(middleware.isLoggedIn, (req, res)=>{
    let newStory = req.body.story;
    newStory.author = req.user;
    Story.create(newStory)
    .then((story) => res.redirect(`/stories/${story._id}`))
    .catch(err => console.log(err));
});

//show new story form
router.get('/new', middleware.isLoggedIn, (req, res) => res.render('stories/new'));

//show user stories
router.get('/my-stories', middleware.isLoggedIn, (req, res)=>{
    console.log(req.user);
    Story.find({'author._id': req.user._id}).exec()
    .then(stories => res.render('stories', {stories: stories}))
    .catch(err => console.log(err));
});

router.route('/:story_id')
//show story 
.get((req, res) =>{
    let id =  req.params.story_id;
    Story.findById(id).populate('comments').exec()
    .then(story => res.render('stories/single-story', {story: story}))
    .catch(err => console.log(err));
})
//update story 
.put(middleware.isLoggedIn, middleware.ownsStory, (req, res) =>{
    let id =  req.params.story_id;
    let update = req.body.story;
    Story.findByIdAndUpdate(id, update, {new: true}).exec()
    .then(story =>{
        res.redirect(`/stories/${id}`);
    })
    .catch(err => console.log(err));
})
//remove story 
.delete(middleware.isLoggedIn, middleware.ownsStory, (req, res)=>{
    Story.remove({_id: req.params.story_id});
    res.redirect(`/stories/my-stories`);
})

//show edit story form
router.get('/:story_id/edit', middleware.isLoggedIn, middleware.ownsStory, (req, res) => {
    Story.findById(req.params.story_id).exec()
    .then(story => res.render('stories/edit', {story: story}))
    .catch(err => console.log(err));
})

module.exports = router;