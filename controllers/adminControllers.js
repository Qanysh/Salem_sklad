const { User, Client } = require('../database/db');

async function adminControllerGetUsers(req, res) {
    const admin = await User.findById(req.session?.userId);
    const clients = await Client.find();
    res.render('admin/admin', { user: admin, allClients: clients, error: null });
}

module.exports = { adminControllerGetUsers };