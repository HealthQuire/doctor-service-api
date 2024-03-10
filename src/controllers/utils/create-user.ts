import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export interface IUserData {
    email: string;
    password: string;
    role: number;
    phone?: string;
    avatarUrl?: string;
    status: string;
}

const createUser = async (userData: IUserData) => {
    const userServiceHook = await axios.post(process.env.USER_SERVICE_URL + 'users/', {
        email: userData.email,
        password: userData.password,
        role: userData.role,
        phone: userData.phone,
        avatarUrl: userData.avatarUrl,
        status: 'active'
    });

    if (userServiceHook.status !== 200) {
        throw new Error('User service error');
    }
    return userServiceHook.data;
};

export default createUser;
