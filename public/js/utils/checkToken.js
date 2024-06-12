import { getCookie, eraseCookie } from './cookies';

function checkTokenValidity() {
    const token = getCookie('session_token');
    if (!token) return;

    try {
            const response = fetch('https://898d958f-e615-40a6-9a94-384daacc9d77.mock.pstmn.io/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                eraseCookie('session_token');
            }

            // Se o token for válido, redirecionar para a página principal
            window.location.href = '../views/main.html';
    }    
    catch (error) {
        console.log('Token inválido:', error);
        eraseCookie('session_token');
    }
}