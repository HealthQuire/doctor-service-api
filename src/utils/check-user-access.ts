import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User, { IUser } from '../database/userSchema';

dotenv.config();

const checkUserAccess = async (token: string | undefined, userAccess: string) => {
    if (!token) return false;

    const userTypes = Object.values(UserTypes);
    const accessLevel = userTypes.indexOf(userAccess);

    if (accessLevel == -1) return false;

    jwt.verify(token, process.env.SECRET, async (err, res) => {
        if (err || !res) {
            return null;
        }

        const userFromDB = await User.findOne({ email: res.email });
        const userAccessLevel = userTypes.indexOf(userFromDB.userAccess);

        return userAccessLevel >= accessLevel;
    });
};

export default checkUserAccess;
