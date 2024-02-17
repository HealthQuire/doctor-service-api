import * as jwt from 'jsonwebtoken';
import config from '../staticData/config';
import User, { IUser } from '../database/userSchema';
import UserTypes from '../staticData/userTypes';

const checkUserAccess = async (token: string | undefined, userAccess: string) => {
    if (!token) return false

    const userTypes = Object.values(UserTypes)
    const accessLevel = userTypes.indexOf(userAccess)

    if (accessLevel == -1) return false

    jwt.verify(token, config.secret, async (err, res) => {
        if (err || !res) {
            return null
        }

        const userFromDB = await User.findOne({ email: res.email })
        const userAccessLevel = userTypes.indexOf(userFromDB.userAccess)

        return userAccessLevel >= accessLevel
    })




}

export default checkUserAccess