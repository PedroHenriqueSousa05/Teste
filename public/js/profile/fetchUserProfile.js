export async function fetchUserProfile(token) {
    try {
        const response = await fetch('https://6464e0e1-e094-4d7e-8266-7d88cf26279e.mock.pstmn.io/user', {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar informações do usuário!');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        return null;
    }
}
