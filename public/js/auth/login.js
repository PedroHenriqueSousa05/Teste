import { fetchUserProfile } from '../profile/fetchUserProfile.js';
import { setCookie, setSessionCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
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

        if (data.message == 'successful'){
            if (cbRememberMe){
                setCookie('token', data.token, 7);
            } else {
                setSessionCookie('token', data.token);
            }
        
            // IMPLEMENTAR SALVAMENTE DE ID DO CLIENTE NOS COOKIES
            // const profileData = await fetchUserProfile(data.token);
            // if (profileData) {
            //     localStorage.setItem('profileData', JSON.stringify(profileData));
            //     window.location.href = 'telapedidos';
            // }
            // else{
            //     console.log('Falha ao buscar informações do usuario')
            // }

        } else{
            displayError(`Senha incorreta, informe uma senha válida!`);
        }
    });
})

async function login(url = '', data = {}){
    const urlpostman = 'https://898d958f-e615-40a6-9a94-384daacc9d77.mock.pstmn.io/login';
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