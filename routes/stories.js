const express = require('express');
const router = express.Router();

const Story = require('../models/story'); 
const middleware = require('../middleware');
//show stories
router.route('/')
.get((req, res)=>{
    Story.find({display:"public"}).exec()
    .then((stories) => {
        res.render('stories', {stories: stories})
    })
    .catch(err => console.log(err));
})
//create new story
.post(middleware.isLoggedIn, (req, res)=>{
    let newStory = res.body.story;
    Story.create(newStory)
    .then((story) => res.redirect(`/stories/${story._id}`))
    .catch(err => console.log(err));
})
//show new story form
router.get('/new', (req, res) => res.render('story/new'));

router.route('/:story_id')
//show story 
.get(middleware.isLoggedIn, (req, res) =>{
    let id =  req.params.story_id;
    Story.findById(id).exec()
    .then(story => res.render('story/single-story', {story: story}))
    .catch(err => console.log(err));
})
//update story 
.put(middleware.isLoggedIn, (req, res) =>{
    let id =  req.params.story_id;
    let update = req.body;
    Story.findByIdAndUpdate(id, update, {new: true}).exec()
    .then(story =>{
        res.redirect(`/stories/${id}`);
    })
    .catch(err => console.log(err));
})
//remove story 
.delete(middleware.isLoggedIn, (req, res)=>{
    Story.remove({_id: req.params.story_id});
    res.redirect(`/stories/my-stories`);
})

//show edit story form
router.get('/:story_id/edit', (req, res) => {
    Story.findById(req.params.story_id).exec()
    .then(story => res.render('story/edit', {story: story}))
    .catch(err => console.log(err));
})
router.get('/my-stories', middleware.isLoggedIn, (req, res)=>{
    // res.send('my stories go here');
    // console.log(req.user._id); 
    Story.find({'author._id': req.user._id}).exec()
    .then(stories => res.render('stories', {stories: stories}))
    .catch(err => console.log(err));
});

module.exports = router;