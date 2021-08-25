//import express router and User Model
const express = require("express");
const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");

//create a new account on the user's side
router.post('/', async(req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
//save session as long as user is logged in and has been assigned an id
        console.log(dbUserData);
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
//sends new user info to express in json to pass off to the database
            res.status(200).json(dbUserData)
        });
        //error handler
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});
//creates a new login session for existing user
router.post('/login', async(req, res) => {
    try {
        const dbUserData = await User.findOne({
            //makes sure username matches the existing username in the databse
            where: {
                username: req.body.username,
            }
        });
//if there's no exisitng username match, throw an error.
        if (!dbUserData) {
            res.status(400)
                .json({ message: 'Failed to recognize this username or password. Please try again!' })
            return;
        }
//make sure password is valid and matches the exising password in the database
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400)
                .json({ message: 'Failed to recognize this username or password. Please try again!' });
                return;
        }

//save the session as long as user us logged in AND has been assigned an id
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            console.log(
                '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );
            //send response status to express with the users info & login message
            res.status(200)
                .json({ user: dbUserData, message: 'logged in!' });
                alert("You are logged in.");
        });
        //error handler
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})
//create a logout session if user is already logged in 
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;