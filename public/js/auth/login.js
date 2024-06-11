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

        const passwordStrength = zxcvbn(password)
        if(passwordStrength.score < 3){
            displayError(`Por favor, escolha uma senha mais forte. score da senha atual: ${passwordStrength.score}`);
            return;
        }

        const data = await login('/login', {email, password});

        if (data.token){
            if (cbRememberMe){
                setCookie('token', data.token, 7);
            } else {
                setSessionCookie('token', data.token);
            }

            const profileData = await fetchUserProfile(data.token);
            if (profileData) {
                localStorage.setItem('profileData', JSON.stringify(profileData));
                window.location.href = 'telapedidos';
            }
            else{
                console.log('Falha ao buscar informações do usuario')
            }
        } else{
                console.log('Login failed');
        }
    });
})

async function login(url = '', data = {}){
    const urlpostman = 'https://374b7935-b9f9-4ddc-ad72-3e9e74e674f1.mock.pstmn.io/login';
    try{
        const response = await fetch(urlpostman,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error(`HTTP ERROR! Status: ${response.status}`);
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