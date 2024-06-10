export async function fetchUserProfile(token) {
    try {
        const response = await fetch('https://374b7935-b9f9-4ddc-ad72-3e9e74e674f1.mock.pstmn.io/user', {
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
