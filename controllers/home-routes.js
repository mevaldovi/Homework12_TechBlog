const router = require('express').Router();
const { Blog, User, Comment } = require('../models');


router.get('/', (req, res) => {
    Blog.findAll({
            include: {
                model: User,
                attributes: ['username'],
            },
        })
        .then((blogData) => {
            const blogs = blogData.map((blog) => blog.get({ plain: true }));
            res.render('homepage', {
                blogs,
                loggedIn: req.session.loggedIn
            });
        })
});

router.get('/post/:id', (req, res) => {
    Blog.findOne({
            where: {
                id: req.params.id
            },

            include: [{
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'blog_id', 'user_id', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ]
        })
        .then((results) => {
            const blogs = results.get({ plain: true });
            console.log(blogs);
            res.render('edBlog', {
                blogs,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => res.json(err))
});

router.get('/login', (req, res) => {
    res.render('login', {})
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;