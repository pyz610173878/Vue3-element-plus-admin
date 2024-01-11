document.addEventListener('DOMContentLoaded', function () {
    const listContainer = document.querySelector('.list-container');

    // 模拟大量数据
    const data = Array.from({ length: 99999 }, (_, i) => `Item ${i + 1}`);

    data.forEach(item => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = item;
        listContainer.appendChild(listItem);
    });
});



