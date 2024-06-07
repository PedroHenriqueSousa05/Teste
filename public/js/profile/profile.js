import { getCookie } from '../utils/cookies.js';
import { fetchUserProfile } from './fetchUserProfile.js';

document.addEventListener('DOMContentLoaded', async () => {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        updateUserInterface(profileData);
    } else {
        console.log('Token não encontrado, voltando para tela de login');
        window.location.href = './auth/login.js';
    }
    
});

function updateUserInterface(profileData) {
    // Update the UI with user profile data
    document.getElementById('user-name').textContent = profileData.name;
    // Show other elements for authenticated users
    document.getElementById('authenticated-section').style.display = 'block';
}