// main.js — Мемориум: Бэкенд (MVP)
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Простая заглушка — список могилок
let graves = [
  {
    id: 1,
    type: "любовь",
    title: "Анна, 2018–2021",
    description: "Спасибо за всё. Я отпускаю.",
    is_public: true,
    created_at: "2025-04-05T12:00:00Z"
  }
];

// GET / — проверка
app.get('/', (req, res) => {
  res.json({ message: "Добро пожаловать в Мемориум. Здесь остаются отголоски." });
});

// GET /graves — получить все публичные могилки
app.get('/graves', (req, res) => {
  res.json(graves);
});

// POST /graves — создать новую могилку
app.post('/graves', (req, res) => {
  const { type, title, description } = req.body;
  const newGrave = {
    id: graves.length + 1,
    type,
    title,
    description,
    is_public: true,
    created_at: new Date().toISOString()
  };
  graves.push(newGrave);
  res.status(201).json(newGrave);
});

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Мемориум-бэкенд запущен на порту ${port}`);
});