import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getUserById = async (id: string) => {
    const userServiceHook = await axios.get(process.env.USER_SERVICE_URL + 'user/' + id);
    if (userServiceHook.status !== 200) {
        throw new Error('User service error');
    }
    return userServiceHook.data;
};

export default getUserById;
