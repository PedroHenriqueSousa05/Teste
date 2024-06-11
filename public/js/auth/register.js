document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('register-password').addEventListener('input', updatePasswordStrength);

    document.getElementById('register').addEventListener('submit', async function(e){
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (!validateEmail(email)) {
            displayError('Por favor, insira um email válido!');
            return;
        }

        if (password !== confirmPassword) {
            displayError('As senhas não coincidem!');
            return;
        }

        const passwordStrength = zxcvbn(password);
        if (passwordStrength.score < 3) {
            displayError(`Por favor, escolha uma senha mais forte!!`);
            return;
        }

        const data = await register('/register', {username, email, password});
        
        if (data.message) {
            displayError('Registro bem-sucedido!', true);
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function displayError(message, success = false) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.color = success ? '#4caf50' : '#ff0000';
    errorMessage.style.backgroundColor = success ? '#1e1e1e' : '#1e1e1e';
    errorMessage.style.borderColor = success ? '#4caf50' : '#b00020';
    errorMessage.classList.remove('hidden');
    if (!success) {
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 10000);
    }
}

async function register(url = '', data = {}) {
    const urlpostman = 'https://898d958f-e615-40a6-9a94-384daacc9d77.mock.pstmn.io/register';
    try {
        const response = await fetch(urlpostman, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP ERROR! Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error:", error);
    }
}

function updatePasswordStrength() {
    const password = document.getElementById('register-password').value;
    const strength = zxcvbn(password).score;
    const strengthBar = document.getElementById('password-strength');
    
    strengthBar.className = '';
    strengthBar.classList.add(`strength-${strength}`);
}
