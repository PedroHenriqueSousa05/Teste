import { eraseCookie, getCookie } from '../utils/cookies.js';
import config from '../../../config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const orders = await getOrders();
    const headers = document.querySelectorAll("th");
    headers.forEach((header, index) => {
        header.innerHTML = header.innerText.replace(/ ▲| ▼/g, '') + (sortDirection ? " ▲" : " ▼");
    });

    const logout = document.getElementById('logout');

    logout.addEventListener('click', () => {
        eraseCookie('session_token');
        window.location.href = '../views/login.html';
    });

    const ordersTableBody = document.querySelector('#orders-table tbody');
    orders.forEach(order => {
        let totalItens = 0;
        
        order.pedido.itens.forEach(item => {
            totalItens += item.valor * item.quantidade;
        })

        const row = document.createElement('tr');
        const date = new Date(order.pedido.dtcriacao);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        row.innerHTML = `
            <td>${order.pedido.codigo}</td>
            <td>${order.pedido.tipopedido}</td>
            <td>${formattedDate}</td>
            <td>R$ ${totalItens.toFixed(2)}</td>
            <td>${order.status}</td>
            <td>${order.pedido.vendedor.nome}</td>
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