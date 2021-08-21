//think of index.js file as the PARENT of the blog and comment-routes files in api.
//import express router and all three database routes in api.
const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require("./comment-routes");
//label & use these following routes
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use("/comments", commentRoutes);

module.exports = router;