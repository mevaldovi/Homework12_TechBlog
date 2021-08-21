//import express router and the Blog Model
const router = require('express').Router();
const { Blog } = require('../../models');

//creating a new blog in the SQL database
router.post('/', async(req, res) => {
    try {
        const dbUserData = await Blog.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        });
        //save the blog data in JSON notation as long as user is logged in
        req.session.save(() => {
            req.session.loggedIn = true,
                res.status(200).json(dbUserData);
        })
//error handler
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//updating a blog in the database
router.put("/", async(req, res) => {
    try {
        console.log(req.body);
        const dbUserData = await Blog.update({
            title: req.body.title,
            text: req.body.text
        }, {
            //update in the database as long as its id matches the blog post id in the URL
            where: {
                id: req.body.id

            }
        });
        //save the blog data in JSON notation as long as user is logged in
        req.session.save(() => {
            req.session.loggedIn = true,
                res.status(200).json(dbUserData);
        })
        //error handler
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//delete a blog post from the database
router.delete("/", async(req, res) => {
    Blog.destory({
            where: {
//delete from the database as long as its id matches the blog post id in the URL
                id: req.body.id
            },
        })
        //respond with the deletedBlog data in JSON notation
        .then((deletedBlog) => {
            res.json(deletedBlog);
        })
        //error handler
        .catch((err) => res.json(err))
});

module.exports = router;