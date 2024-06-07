import { fetchUserProfile } from '../profile/fetchUserProfile.js';
import { setCookie, setSessionCookie } from '../utils/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('submit', async function(e){
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const cbRememberMe = document.getElementById('remember-me').checked;
        const data = await login('/login', {email, password});

        console.log(data);

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
    console.log(JSON.stringify(data));

    const urlpostman = 'https://6464e0e1-e094-4d7e-8266-7d88cf26279e.mock.pstmn.io/login'
    const response = await fetch(urlpostman,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}