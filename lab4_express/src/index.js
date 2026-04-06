const express = require('express');
const path = require('path');
const cors = require('cors');
const groupsRouter = require('./routes/groups');
const groupService = require('./services/groupService');

const app = express();
const PORT = 3004;

const DATA_FILE_PATH = path.join(__dirname, 'data/groups.json');

groupService.init(DATA_FILE_PATH);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/groups', groupsRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📋 API групп: http://localhost:${PORT}/api/groups`);
});
