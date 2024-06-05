const { Client } = require('../database/db');


async function clientPOST(req, res){
    const { clientname, phone_number, box_size, created_at } = req.body;

    const clientExists = await Client.findOne({ phone_number: phone_number });

    if (clientExists) {
        return res.render('index', { error: 'Такой номер уже зарегистрирован!', success: null });
    }

    try {
        client = new Client({ clientname, phone_number, box_size, created_at });
    } catch (exception) {
        return res.render('index', { error: `Error creating user!<br>${exception}`, success: null });
    }

    await client.save();

    return res.render('index', { error: null, success: 'New client in order successfully!' });
}

module.exports = {clientPOST};