const router = require('express').Router();
const { Blog, User } = require('../models/');
// const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    const blogData = await Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: {
            model: User,
            attributes: ['username'],
        },
    }).catch((err) => {
        res.json(err);
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);
    res.render('dashboard', {
        blogs,
        loggedIn: req.session.loggedIn
    });
});

router.get('/:id', async(req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
        alert('You need to be logged in!');
    } else {
        Blog.findByPk(req.params.id)
            .then((results) => {
                const blogs = results.get({ plain: true });
                console.log(blogs);
                res.render('edBlog', {
                    blogs,
                    loggedIn: req.session.loggedIn
                });
            })
            .catch((err) => res.json(err))
    }
});

module.exports = router;