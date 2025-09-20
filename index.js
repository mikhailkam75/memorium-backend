// index.js — Мемориум: Бэкенд с Supabase
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Настройка Supabase — твои данные
const supabaseUrl = 'https://hxttvpgjqnsmhfxvbnsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dHR2cGdqcW5zbWhmeHZibnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMzU3MjYsImV4cCI6MjA3MTgxMTcyNn0.BtdrzGZfYA4otzFuE_jpYLSMXfEAzrEZLQxODZuw__Y';
const supabase = createClient(supabaseUrl, supabaseKey);

// GET / — проверка
app.get('/', (req, res) => {
  res.json({ message: "Добро пожаловать в Мемориум. Здесь остаются отголоски." });
});

// GET /graves — получить все могилки
app.get('/graves', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('graves')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Ошибка при получении могилок:', err);
    res.status(500).json({ error: 'Ошибка при получении могилок' });
  }
});

// POST /graves — создать новую могилку
app.post('/graves', async (req, res) => {
  const { type, title, description } = req.body;

  // Проверка обязательных полей
  if (!type || !title || !description) {
    return res.status(400).json({ error: 'Требуются поля: type, title, description' });
  }

  try {
    const { data, error } = await supabase
      .from('graves')
      .insert([
        { type, title, description, is_public: true }
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Ошибка при создании могилки:', err);
    res.status(500).json({ error: 'Ошибка при создании могилки' });
  }
});

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Мемориум-бэкенд запущен на порту ${port}`);
});
