const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// 使用中间件
app.use(cors()); // 允许跨域
app.use(bodyParser.json()); // 解析 JSON 数据

// 数据库连接
const db = mysql.createConnection({
  host: 'localhost',     
  user: 'root',          
  password: '123456',  
  database: 'park_db'    
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

  // 数据验证
  if (!description || description.trim() === '') {
    return res.status(400).json({ message: '问题描述不能为空！' });
  }

  const query = 'INSERT INTO reports (description, contact) VALUES (?, ?)';
  db.query(query, [description, contact], (err, results) => {
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
  console.log(`服务器运行在 http://localhost:${port}`);
});
