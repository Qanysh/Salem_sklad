const express = require('express');
const session = require('express-session');
const path = require('path');
const ensureIsAdmin = require('./middleware/AuthMiddleware');
const { loginPost } = require('./controllers/loginControllers');
const { registerPost } = require('./controllers/registerControllers');
const { adminControllerGetUsers } = require('./controllers/adminControllers');
const { clientPOST } = require('./controllers/clientControllers');
const { Client } = require('./database/db');


const app = express();
const port = 3000;


const imagesPath = path.join(__dirname, '/views'); // Путь к папке с изображениями

app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.use(express.static(imagesPath)); // Используем express.static для обслуживания статических файлов из папки с изображениями
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/login', (req, res) => {
    res.render('login', { user: null, error: null});
});

app.post('/login', async (req, res) => {
    return loginPost(req, res);
});

app.get('/signup', (req, res) => {
    res.render('signup', { user: null, error: null, success: null });
});

app.post('/signup', async (req, res) => {
    return registerPost(req, res);
});

app.get("/admin", ensureIsAdmin, async (req, res) => {
    return adminControllerGetUsers(req, res);
});

app.get('/', async (req, res) => {
    const client = await Client.findById(req.session?.userId);
    res.render('index', {client: client, error:null, success: null });
});

app.post('/', async(req, res) => {
    return clientPOST(req, res);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at :${port}`);
});