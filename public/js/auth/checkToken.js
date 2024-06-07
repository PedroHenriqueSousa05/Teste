import { getCookie } from '../utils/cookies.js';
import { fetchUserProfile } from '../profile/fetchUserProfile.js';
import { updateUserInterface} from '../profile/profile.js'

export async function checkToken() {
    const token = getCookie('token');
    if (token) {
        console.log('User is authenticated');

        const profileData = await fetchUserProfile(token);
        updateUserInterface(profileData);
        
    } else {
        console.log('No token found, user is not authenticated');
    }
}
