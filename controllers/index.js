//use express router and import the api backe-end routes as well as the two front ends routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require("./home-routes");
const dashRoutes = require("./dash-routes");
//use these routes
router.use("/", homeRoutes)
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes)

module.exports = router;