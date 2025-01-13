const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // 使用 pg 模块连接 PostgreSQL
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 设置静态文件目录
app.use(express.static(path.join(__dirname))); // 将当前目录作为静态文件目录

// 数据库连接池配置
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:26dMfGiLOwWr@ep-wispy-base-a59q8uij.us-east-2.aws.neon.tech/neondb?sslmode=require', // 替换为你的 PostgreSQL 连接字符串
  ssl: {
    rejectUnauthorized: false, // Neon 需要启用 SSL
  },
});

// 测试数据库连接
pool.connect((err, client) => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('数据库连接成功！');
  }
});

// 创建 API 路由 - 提交问题
app.post('/api/report', async (req, res) => {
  const { description, contact } = req.body;

  if (!description || description.trim() === '') {
    return res.status(400).json({ message: '问题描述不能为空！' });
  }

  try {
    const query = 'INSERT INTO reports (description, contact) VALUES ($1, $2)';
    await pool.query(query, [description, contact]);
    res.status(200).json({ message: '问题已成功提交！' });
  } catch (err) {
    console.error('插入数据失败:', err);
    res.status(500).json({ message: '服务器错误，请稍后重试！' });
  }
});

// 创建 API 路由 - 获取所有问题
app.get('/api/reports', async (req, res) => {
  try {
    const query = 'SELECT * FROM reports ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error('获取数据失败:', err);
    res.status(500).json({ message: '服务器错误，请稍后重试！' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
