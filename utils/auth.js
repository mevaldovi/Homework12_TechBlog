const withAuth = (req, res, next) => {
    //if the user is not logged in, redirect to the login page
    if (!req.session.loggedIn) {
        res.redirect("login");
    } else {
        next();
    }
    //if the user IS logged in, execute the route function that will direct the user to view the page
    //we're gonna call the "next()" function if user is authenticated
};
module.exports = withAuth();