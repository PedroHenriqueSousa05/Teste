import { eraseCookie, getCookie } from '../utils/cookies.js';
import config from '../../../config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const orders = await getOrders();

    const logout = document.getElementById('logout');

    logout.addEventListener('click', () => {
        eraseCookie('session_token');
        window.location.href = '../views/login.html';
    });



    const ordersTableBody = document.querySelector('#orders-table tbody');
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.pedido_id}</td>
            <td>${order.data_pedido}</td>
            <td>R$${order.total}</td>
        `;
        ordersTableBody.appendChild(row);
    });
});

async function getOrders(){
    const urlpostman = `${config.apiUrl}/Pedido`;
    try{
        const response = await fetch(urlpostman, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('session_token')
            }
        });

        if (!response.ok) {
            console.log('Error:', response.status);
        }

        const result = await response.json();
        return result;
    }
    catch(error){
        console.log("Error:", error);
    }
}