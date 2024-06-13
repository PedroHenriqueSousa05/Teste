import config from "../../../config";

export async function fetchUserProfile(token) {
    try {
        const response = await fetch(`${config.apiUrl}/Usuario`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
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
