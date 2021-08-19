const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require("./home-routes");
const dashRoutes = require("./dash-routes");

router.use("/", homeRoutes)
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes)

module.exports = router;