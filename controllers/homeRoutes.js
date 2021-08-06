const router = require('express').Router();
const { Project } = require('../models');


router.get("/", (req, res) => {
    Project.findAll()
        .then(data => {
            const posts = data.map(item => item.get({ plain: true }))
            console.log(posts);
            res.render("homepage", { posts })
        })
        .catch(err => {
            console.log(err);
        })

})





















module.exports = router;