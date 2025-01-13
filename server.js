const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 设置静态文件目录
app.use(express.static(path.join(__dirname))); // 将当前目录作为静态文件目录

// 数据库连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'park_db',
});

// 测试数据库连接
db.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('数据库连接成功！');
  }
});

// 创建 API 路由 - 提交问题
app.post('/api/report', (req, res) => {
  const { description, contact } = req.body;
  if (!description || description.trim() === '') {
    return res.status(400).json({ message: '问题描述不能为空！' });
  }

  const query = 'INSERT INTO reports (description, contact) VALUES (?, ?)';
  db.query(query, [description, contact], (err) => {
    if (err) {
      console.error('插入数据失败:', err);
      return res.status(500).json({ message: '服务器错误，请稍后重试！' });
    }
    res.status(200).json({ message: '问题已成功提交！' });
  });
});

// 创建 API 路由 - 获取所有问题
app.get('/api/reports', (req, res) => {
  const query = 'SELECT * FROM reports ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('获取数据失败:', err);
      return res.status(500).json({ message: '服务器错误，请稍后重试！' });
    }
    res.status(200).json(results);
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://192.168.10.95:${port}`);
});
