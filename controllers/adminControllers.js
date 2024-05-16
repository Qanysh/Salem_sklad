const { User, Client } = require('../database/db');

async function adminControllerGetUsers(req, res) {
    const admin = await User.findById(req.session?.userId);
    const clients = await Client.find();
    res.render('admin/admin', { user: admin, allClients: clients, error: null });
}

async function adminControllerUpdateUsers(req, res) {
    const user = await User.findById(req.body.userId);
    const username = req.body.us_username;

    await User.updateOne({ _id: user._id }, { username, updated_at: new Date()});

    return res.redirect("/admin");
}

async function adminControllerDeleteUsers(req, res) {
    const userId = req.params.userid;

    await User.deleteOne({ _id: userId });

    return res.redirect("/admin");
}


module.exports = { adminControllerGetUsers, adminControllerUpdateUsers, adminControllerDeleteUsers};