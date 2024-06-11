document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('username');
    const dropdown = document.getElementById('dropdown');
    
    username.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (event) => {
        if (!username.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    });

    const orders = [
        { number: '174582', date: '2024-06-10', value: 'R$ 150,00' },
        { number: '173577', date: '2024-06-11', value: 'R$ 200,00' },
        { number: '174828', date: '2024-06-12', value: 'R$ 250,00' }
    ];

    const ordersTableBody = document.querySelector('#orders-table tbody');
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.number}</td>
            <td>${order.date}</td>
            <td>${order.value}</td>
        `;
        ordersTableBody.appendChild(row);
    });
});
