const router = require('express').Router();

const Account = require('../models/Account.js');
const Owner = require('../models/Owner.js');

router.get('/accounts', async (req, res) => {
    const { value } = req.session;
    if (value == 'noSession' || typeof value === 'undefined') {
        return res.redirect('/login?error=Your request needs authorization. Please log in.');
    } else if (value.role.role != "ADMIN") {
        return res.redirect('/?error=Your request needs authorization.');
    } else {
        try {
            const allAccountsWithOwners = await Account.query().select('username', 'id').withGraphFetched('owner');
            return res.render('accounts/accounts.ejs', {
                accounts: allAccountsWithOwners,
                session: value
            });
        } catch (error) {
            console.log(error);
        };
    };
});

router.get('/accounts/:id', (req, res) => {
    const { value } = req.session;
    const { id } = req.params;
    if (value == 'noSession' || typeof value === 'undefined') {
        return res.redirect('/login?error=Your request needs authorization. Please log in.');
    } else {
        try {
            Account.query().select('username', 'id')
                .where('id', id)
                .withGraphFetched('owner')
                .then(accountWithOwner => {
                    return res.send({ account: accountWithOwner[0], session: value })
                });
        } catch (error) {
            console.log(error);
            return res.redirect('/login?error=Error, please try again');
        };
    };
});

router.get('/accounts/:id/edit', async (req, res) => {
    const { value } = req.session;
    const { id } = req.params;
    if (value == 'noSession' || typeof value === 'undefined') {
        return res.redirect('/login?error=Your request needs authorization. Please log in.');
    } else if (value.role.role != "ADMIN") {
        return res.redirect('/?error=Your request needs authorization.');
    } else {
        try {
            const account = await Account.query().select('username', 'id').where('id', id)
                .withGraphFetched('owner').withGraphFetched('role');
            return res.render('accounts/editForm.ejs', { session: value, id: id });
        }
        catch (error) {
            console.log(error);
            return res.redirect('/login?error=Error, please try again');
        };
    };

});

router.post('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, cpr, firstname, lastname } = req.body;
    try {
        const acc = await Account.query().patchAndFetchById(id, {
            username,
        });
        console.log(acc)
        const own = await Owner.query().findById(acc.ownerId).patch({
            email,
            cpr,
            first_name: firstname,
            last_name: lastname
        });
        console.log(own);
    } catch (error) {
        console.log(error);
    };
    return res.redirect('/accounts');
});

router.post('/accounts/:id/delete', async (req, res) => {
    const { value } = req.session;
    const { id } = req.params;
    if (value == 'noSession' || typeof value === 'undefined') {
        return res.redirect('/login?error=Your request needs authorization. Please log in.');
    } else if (value.role.role != "ADMIN") {
        return res.redirect('/?error=You have to have ADMIN role.');
    } else {
        try {
            const deleted = await Account.query().deleteById(id);
            console.log(deleted, " accounts deleted");
            return res.redirect('/accounts');
        } catch (error) {
            console.log(error);
        };
    };
});

module.exports = router;