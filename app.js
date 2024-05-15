const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
const imagesPath = path.join(__dirname, '/views'); // Путь к папке с изображениями

app.use(express.static(imagesPath)); // Используем express.static для обслуживания статических файлов из папки с изображениями


app.get('/', (req, res) => {
    // Отправляем файл index.html
    res.render('index');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at :${port}`);
});