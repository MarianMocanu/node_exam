const router = require('express').Router();

const Account = require('../models/Account.js');
const Owner = require('../models/Owner.js');

const bcrypt = require('bcrypt');
const saltRounds = 12;

const mailer = require('../static/email.js');

router.get('/login', (req, res) => {
    const { error } = req.query;
    const { value } = req.session;
    return res.render('login/login.ejs', {
        error: error ? error : 'noError',
        session: value ? value : 'noSession'
    });
});

router.get('/signup', (req, res) => {
    const { error } = req.query;
    const { value } = req.session;
    return res.render('signup/signup.ejs', {
        error: error ? error : 'noError',
        session: value ? value : 'noSession'
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        try {
            Account.query().select('id', 'username', 'password').where('username', username)
                .withGraphFetched('role').withGraphFetched('owner').then(foundUser => {
                    if (foundUser.length == 0) {
                        return res.status(400).redirect('/login?error=User does not exist!');
                    } else {
                        bcrypt.compare(password, foundUser[0].password).then(match => {
                            if (match) {
                                console.log('after login', foundUser[0]);
                                req.session.value = foundUser[0];
                                return res.redirect('/');
                            } else {
                                return res.status(400).redirect('/login?error=Password entered is incorrect!');
                            }
                        });
                    }
                });
        } catch (error) {
            return res.status(500).redirect('/login?error=Database error');
        }
    } else {
        return res.status(400).redirect('/login?error=username or password missing');
    }
});

const { validEmail } = require('../util');
router.post('/signup', (req, res) => {
    const { username, password, email, cpr, firstname, lastname } = req.body;

    if (username && password && cpr && firstname && lastname && email) {
        // password validation
        if (password.length < 8) {
            return res.status(400).redirect('/signup?error=Password must be 8 characters or longer');
        }
        // first && last name validation
        else if (firstname.length < 3 || lastname.length < 3) {
            return res.status(400).redirect('/signup?error=Name must be 3 characters or longer');
        }
        // cpr validation
        else if (cpr.length != 8) {
            if (isNaN(cpr)) {
                return res.status(400).redirect('/signup?error=CPR has to be a number');
            }
            return res.status(400).redirect('/signup?error=CPR must have 8 numbers');
        }
        // email validation
        else if (!validEmail(email)) {
            return res.status(400).redirect('/signup?error=Email not valid');
        }
        else {
            try {
                Account.query().select('username').where('username', username).then(foundUsers => {
                    if (foundUsers.length > 0) {
                        return res.status(400).redirect('/signup?error=User already exists');
                    } else {
                        // insert owner into db
                        Owner.query().insert({
                            first_name: firstname,
                            last_name: lastname,
                            cpr,
                            email
                        }).then(createdOwner => {
                            // hash password
                            bcrypt.hash(password, saltRounds)
                                .then(hashedPassword => {
                                    // insert account into db
                                    Account.query().insert({
                                        username,
                                        password: hashedPassword,
                                        role_id: 2,
                                        owner_id: createdOwner.id
                                    }).then(createdAccount => {
                                        // send confirmation mail
                                        mailer.sendMail({
                                            from: 'Marian Mocanu 👻', // sender address
                                            to: createdOwner.email,
                                            subject: 'New Account Created ✔',
                                            text: `Hello ${firstname} ${lastname}, your account has been successfully created.`
                                        }).then(() => {
                                            req.session.value = createdAccount;
                                            req.session.message = 'Account successfuly created!';
                                            return res.redirect('/');
                                        });

                                    });
                                })
                        });
                    };
                });
            } catch (error) {
                return res.status(500).redirect('/signup?error=Something went wrong with the DB');
            };
        };
    } else {
        return res.status(400).redirect('/signup?error=form data missing');
    };
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.render('home/home.ejs', {
                error: error,
                session: 'noSession'
            });
        }
        return res.redirect('/');
    });
});
module.exports = router;