const express = require('express');
const path = require('path');
const ensureIsAdmin = require('./middleware/AuthMiddleware');

const app = express();
const port = 3000;


const imagesPath = path.join(__dirname, '/views'); // Путь к папке с изображениями

app.set('view engine', 'ejs');
app.use(express.static(imagesPath)); // Используем express.static для обслуживания статических файлов из папки с изображениями
app.use(express.json());

app.get('/admin', ensureIsAdmin, async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.render('admin/admin');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at :${port}`);
});