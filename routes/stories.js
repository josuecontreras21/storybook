const express = require('express');
const router = express.Router({mergeParams:true});

const Story = require('../models/story'); 
const {isLoggedIn, ownsStory, isPublic} = require('../middleware');

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
.post(isLoggedIn, (req, res)=>{
    let {story: newStory} = req.body;
    if(!newStory.allowComments) newStory.allowComments = false;  
    newStory.author = req.user;
    Story.create(newStory)
    .then((story) => res.redirect(`/stories/${story._id}`))
    .catch(err => console.log(err));
});

//show new story form
router.get('/new', isLoggedIn, (req, res) => res.render('stories/new'));

//show user stories
router.get('/my-stories', isLoggedIn, (req, res)=>{
    console.log(req.user);
    Story.find({'author._id': req.user._id}).exec()
    .then(stories => res.render('stories', {stories: stories}))
    .catch(err => console.log(err));
});

router.route('/:story_id')
//show story 
.get(isPublic, (req, res) =>{
    let id =  req.params.story_id;
    Story.findById(id).populate('comments').exec()
    .then(story => res.render('stories/single-story', {story: story}))
    .catch(err => console.log(err));
})
//update story 
.put(isLoggedIn, ownsStory, (req, res) =>{
    let update = req.body.story;
    if(!update.allowComments) update.allowComments = false; 
    Story.findByIdAndUpdate(req.params.story_id, update, {new: true}).exec()
    .then(story =>{
        res.redirect(`/stories/${req.params.story_id}`);
    })
    .catch(err => console.log(err));
})
//remove story 
.delete(isLoggedIn, ownsStory, (req, res)=>{
    Story.remove({_id: req.params.story_id})
    .then(()=> res.redirect(`/dashboard`))
    .catch(err => console.log(err));
});

//show edit story form
router.get('/:story_id/edit', isLoggedIn, ownsStory, (req, res) => {
    Story.findById(req.params.story_id).exec()
    .then(story => res.render('stories/edit', {story: story}))
    .catch(err => console.log(err));
}); 

module.exports = router;