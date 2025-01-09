// 引入 mysql2/promise 以支持异步操作
import mysql from 'mysql2/promise';

// 数据库连接池配置，使用环境变量从 Vercel 中获取数据库连接信息
const db = mysql.createPool({
    host: mysql.railway.internal,       // 数据库主机
    user: root,       // 数据库用户名
    password: dvSBxjbmNlfwFUoYpYwomudHsQofVbAI, // 数据库密码
    database: railway,     // 数据库名称
    port: 3306         // 数据库端口
});

// 定义 API 处理程序
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: '仅支持 POST 请求' });
    }

    // 从请求体中获取数据
    const { description, contact } = req.body;

    // 校验提交的表单数据
    if (!description || description.trim() === '') {
        return res.status(400).json({ message: '问题描述不能为空！' });
    }

    try {
        // 插入数据到数据库
        const [result] = await db.query(
            'INSERT INTO reports (description, contact) VALUES (?, ?)',
            [description, contact]
        );
        console.log('插入数据成功:', result);

        // 返回成功响应
        return res.status(200).json({ message: '提交成功！' });
    } catch (error) {
        console.error('数据库错误:', error);

        // 返回错误响应
        return res.status(500).json({ message: '服务器错误，请稍后重试！' });
    }
}
