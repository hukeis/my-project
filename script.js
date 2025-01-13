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
    // 发送数据到后端
    const response = await fetch('http://192.168.10.95:3000/api/report', {
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
