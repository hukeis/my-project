export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: '仅支持 POST 请求' });
    }

    const { description, contact } = req.body;

    if (!description || description.trim() === '') {
        return res.status(400).json({ message: '问题描述不能为空！' });
    }

    try {
        // 模拟存储数据，可以扩展为实际数据库存储逻辑
        console.log('问题描述:', description);
        console.log('联系方式:', contact);

        return res.status(200).json({ message: '提交成功！' });
    } catch (error) {
        console.error('提交失败:', error);
        return res.status(500).json({ message: '服务器错误，请稍后重试！' });
    }
}
