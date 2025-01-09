const form = document.getElementById('reportForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        description: form.description.value.trim(),
        contact: form.contact.value.trim(),
    };

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            alert('问题提交成功！');
            form.reset();
        } else {
            alert('提交失败：' + result.message);
        }
    } catch (error) {
        alert('网络错误，请稍后重试！');
    }
});
