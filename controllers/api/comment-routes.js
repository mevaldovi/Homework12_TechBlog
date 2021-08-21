//import express' built-in Router and the Comment Model
const router = require('express').Router();
const { Comment } = require('../../models');

//creating a new comment in the database
router.post('/', async(req, res) => {
    try {
        const dbUserData = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        });
//save the session AND save the blog data in JSON notation as long as user is logged in
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData)
        })
        //error handler
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;
