// 获取表单 DOM 元素
const form = document.getElementById('reportForm');

// 表单提交事件监听
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 阻止默认提交行为

    // 收集表单数据
    const data = {
        description: form.description.value.trim(),
        contact: form.contact.value.trim(),
    };

    try {
        // 调用后端 API 提交数据
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            alert('问题提交成功！');
            form.reset(); // 提交成功后清空表单
        } else {
            alert('提交失败：' + result.message);
        }
    } catch (error) {
        alert('网络错误，请稍后重试！');
    }
});
