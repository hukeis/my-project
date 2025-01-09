import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',      // 替换为您的数据库地址
    user: 'root',           // 数据库用户名
    password: '123456',   // 数据库密码
    database: 'park_db'     // 数据库名称
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: '仅支持 POST 请求' });
    }

    const { description, contact } = req.body;

    if (!description || description.trim() === '') {
        return res.status(400).json({ message: '问题描述不能为空！' });
    }

    try {
        // 插入数据到数据库
        await db.query('INSERT INTO reports (description, contact) VALUES (?, ?)', [description, contact]);

        return res.status(200).json({ message: '提交成功！' });
    } catch (error) {
        console.error('数据库错误:', error);
        return res.status(500).json({ message: '服务器错误，请稍后重试！' });
    }
}
