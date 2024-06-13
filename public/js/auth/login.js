import { setCookie, setSessionCookie } from '../utils/cookies.js';
import { checkTokenValidity } from '../utils/checkToken.js';
import config from '../../../config.js';

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
        
            window.location.href = '../views/main.html'

        } else{
            displayError(`Senha incorreta, informe uma senha válida!`);
        }
    });
})

async function login(url = '', data = {}){
    const urlpostman = `${config.apiUrl}/login`;
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