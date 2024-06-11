export async function fetchUserProfile(token) {
    try {
        const response = await fetch('https://898d958f-e615-40a6-9a94-384daacc9d77.mock.pstmn.io/user', {
            method: 'POST',
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
