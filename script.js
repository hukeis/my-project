// 获取表单元素
const form = document.getElementById('reportForm');

// 监听表单提交事件
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // 阻止默认提交行为

  // 获取用户输入的数据
  const data = {
    description: form.description.value.trim(),
    contact: form.contact.value.trim(),
  };

  try {
    // 发送数据到后端 API
    const response = await fetch('https://my-project-l4ue.vercel.app/api/report', { // 替换为你的 Vercel 部署地址
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('您的问题已成功提交！');
      form.reset();
    } else {
      const error = await response.json();
      alert(`提交失败: ${error.message}`);
    }
  } catch (error) {
    console.error('网络错误:', error);
    alert('提交失败，请检查网络连接！');
  }
});
