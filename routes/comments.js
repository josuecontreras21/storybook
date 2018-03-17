const express = require('express');
const router = express.Router({mergeParams: true});

const Comment = require('../models/comment'); 
const Story = require('../models/story'); 
const {isLoggedIn, ownsStory} = require('../middleware');

router.route('/')
//create new comment
.post(isLoggedIn, (req, res)=>{
    let comment = req.body.comment;
    comment.author = req.user;
    Comment.create(comment)
    .then(newComment =>{
        Story.findOneAndUpdate({_id: req.params.story_id}, {$push: {comments: newComment}}, {new: true}).exec()
        .then(story => {
            res.redirect(`/stories/${req.params.story_id}`);
            console.log(story);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
//show new comment form
router.get('/new', (req, res) => res.render('comments/new'));

router.route('/:comment_id')
//update comment 
.put(isLoggedIn, (req, res) =>{
    let id =  req.params.comment_id;
    let update = req.body;
    Comment.findByIdAndUpdate(id, update, {new: true}).exec()
    .then(comment =>{
        res.redirect(`/stories/${req.params.story_id}`);
    })
    .catch(err => console.log(err));
})
//remove comment 
.delete(isLoggedIn, (req, res)=>{
    Comment.remove({_id: req.params.comment_id});
    res.redirect(`/stories/${req.params.story_id}`);
});

//show edit comment form
router.get('/:comment_id/edit', (req, res) => {
    Comment.findById(req.params.comment_id).exec()
    .then(comment => res.render('comments/edit', {comment: comment}))
    .catch(err => console.log(err));
});

module.exports = router;