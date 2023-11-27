import { NextApiRequest, NextApiResponse } from 'next'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import connection from '../../../database/connection';
import { env } from 'process';
import { UserModel, User } from '../../../models/user';


const secret: any = env.JWT_SECRET
export default async function SignupEndpoint(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const singup: User = req.body;

    const checkUser = await UserModel.findOne({ email: singup.email });

    if (checkUser) {
        res.json({ error: true, accountExists: true, message: "Account with this email already exist" })
    } else {
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hashSync(singup.password, salt);
        console.log(hash)
        singup.password = hash
        const newUser: any = await UserModel.create(singup);
        if (newUser) {

            const { _id, email, } = newUser;
            delete newUser.password
            const token = JWT.sign({ _id, email }, secret);
            res.json({ success: true, token, user: { ...newUser._doc, password: '🔒🔒🔒🔒' } })
        } else {
            res.json({ error: true, message: "" })
        }
    }
}
