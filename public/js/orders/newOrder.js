import { getCookie, eraseCookie } from "../utils/cookies.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-order-form');
    const logout = document.getElementById('logout');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.height = 0;
                content.style.display = 'none';
            });
            
            button.classList.add('active');
            const targetContent = document.getElementById(target);
            targetContent.style.display = 'block';
            setTimeout(() => {
                targetContent.style.height = 'auto';
                targetContent.classList.add('active');
            }, 0);
        });
    });

    logout.addEventListener('click', () => {
        eraseCookie('session_token');
        window.location.href = '../views/login.html';
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const codigo = document.getElementById('codigo').value;
        const tipopedido = document.getElementById('tipopedido').value;
        const dtcriacao = document.getElementById('dtcriacao').value;
        const valor = document.getElementById('valor').value;
        const status = document.getElementById('status').value;
        const vendedor = document.getElementById('vendedor').value;

        const order = {
            pedido: {
                codigo,
                tipopedido,
                dtcriacao,
                itens: [
                    {
                        valor,
                        quantidade: 1 
                    }
                ],
                vendedor: {
                    nome: vendedor
                }
            },
            status
        };

        // try {
        //     const response = await fetch(`${config.apiUrl}/Pedido`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + getCookie('session_token')
        //         },
        //         body: JSON.stringify(order)
        //     });

        //     if (!response.ok) {
        //         throw new Error('Erro ao adicionar pedido');
        //     }

        //     alert('Pedido adicionado com sucesso!');
        //     form.reset();
        // } catch (error) {
        //     console.error('Erro:', error);
        //     alert('Erro ao adicionar pedido');
        // }
    });
});
