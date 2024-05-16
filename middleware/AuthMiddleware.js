const { User } = require('../database/db');

async function ensureIsAdmin(req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);

            if (user && user.admin) {
                next();
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error("Error checking admin status:", error);
            res.redirect('/');
        }
    } else {
        res.redirect('/login');
    }
}

module.exports = ensureIsAdmin;