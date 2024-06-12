import { setCookie, setSessionCookie } from '../utils/cookies.js';
import { checkTokenValidity } from '../utils/checkToken.js';

document.addEventListener('DOMContentLoaded', () => {
    checkTokenValidity();

    document.getElementById('login').addEventListener('submit', async function(e){
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const cbRememberMe = document.getElementById('remember-me').checked;

        if (!await validateEmail(email)){
            displayError('Por favor, insira um email válido!');
            return;
        }

        const data = await login('/login', {email, password});

        if (data.message == 'Authorized'){
            if (cbRememberMe){
                setCookie('session_token', data.token, 30);
            } else {
                setSessionCookie('session_token', data.token);
            }
        
            // IMPLEMENTAR SALVAMENTE DE ID DO CLIENTE NOS COOKIES
            window.location.href = '..views/main.html'

        } else{
            displayError(`Senha incorreta, informe uma senha válida!`);
        }
    });
})

async function login(url = '', data = {}){
    const urlpostman = 'https://35b2b4b0-fbdf-4ca1-8883-6787d0892ff5.mock.pstmn.io/login';
    try{
        const response = await fetch(urlpostman,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.status == 404){
            return 'login failed';
        }
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log("Error:", error);
    }
}

async function validateEmail(email = ''){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 3000); // Esconde a mensagem após 3 segundos
}