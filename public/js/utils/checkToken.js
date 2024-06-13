import { eraseCookie, getCookie } from "./cookies.js";
import config from "../../../config.js";

export async function checkTokenValidity() {
    const token = getCookie('session_token');
    if (!token) return;

    try {
            const response = await fetch(`${config.apiUrl}/Usuario`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                eraseCookie('session_token');
            }
            else{
                window.location.href = '../views/main.html';
            }
    }
    catch (error) {
        console.log('Token inválido:', error);
        eraseCookie('session_token');
    }
}