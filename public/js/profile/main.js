document.addEventListener('DOMContentLoaded', () => {

    const orders = [
        { number: '17458276', date: '2024-06-10', value: 'R$ 150,00' },
        { number: '17357764', date: '2024-06-11', value: 'R$ 200,00' },
        { number: '1748282368', date: '2024-06-12', value: 'R$ 250,00' },
        { number: '17458216', date: '2024-06-10', value: 'R$ 150,00' },
        { number: '173577123', date: '2024-06-11', value: 'R$ 200,00' },
        { number: '174828123', date: '2024-06-12', value: 'R$ 250,00' },
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
