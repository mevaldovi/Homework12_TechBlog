const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async(req, res) => {
    try {
        const dbUserData = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});


module.exports = router;