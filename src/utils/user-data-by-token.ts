import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const userDataByToken = async (token: string) => {
    jwt.verify(token, process.env.SECRET, (err, res) => {
        if (err) {
            return null
        }
        console.log(res)
        return res
    })
}

export default userDataByToken