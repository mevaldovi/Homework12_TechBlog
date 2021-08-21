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

// router.get('/', (req, res) => {
//     Comment.findAll({
//             include: {
//                 model: User,
//                 attributes: ['username'],
//             },
//         })
//         .then((commentData) => {
//             const comments = commentData.map((comment) => comment.get({ plain: true }));
//             res.render('comment', {
//                 comments,
//                 loggedIn: req.session.loggedIn
//             });
//         })
// });
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
        .then((blogData) => {
            const blogs = blogData.map((blog) => blog.get({ plain: true }));
            // const blogs = results.get({ plain: true });
            console.log(blogs);
            res.render('edBlog', {
                blog,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => res.json(err))
});

// router.get('/post/:id', (req, res) => {
//     Comment.findOne({
//             where: {
//                 id: req.params.id
//             },

//             include: [{
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['id', 'content', 'blog_id', 'user_id', 'createdAt'],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     }
//                 },
//             ]
//         })
//         .then((results) => {
//             const comments = results.get({ plain: true });
//             // const comments = result.get({plain: true});
//             // console.log(comments);
//             console.log(comments);
//             res.render('comment', {
//                 comments,
//                 loggedIn: req.session.loggedIn,
//             });
//         })
//         .catch((err) => res.json(err))
// });

//am i also supposed to create a post route for login and signup?? How else am I going to 
//redirect the user who signs up to the main home page?
router.get('/login', (req, res) => {
    res.render('login', {})
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;