import { NextApiRequest, NextApiResponse } from 'next'
import { Signin, } from '../../../reusable/interfaces'

import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import connection from '../../../database/connection';

import { env } from 'process';
import { UserModel } from '../../../models/user';

const secret: any = env.JWT_SECRET

export default async function SigninEndpoint(req: NextApiRequest, res: NextApiResponse) {
    await connection()
    const singin: Signin = req.body;

    const user: any = await UserModel.findOne({ email: singin.email });

    if (!user) {
        res.json({ error: true, accountError: true, message: "user doesn't exist" })
    } else {
        // hash password
        if (singin.provider === 'google-provider') {
            const { _id, email, } = user;
            delete user.password
            const token = JWT.sign({ _id, email, photoURL: singin.photoURL, provider: singin.provider }, secret);
            res.json({ success: true, token, user: { ...user._doc, password: '🔒🔒🔒🔒' } })
        } else {
            bcrypt.compare(singin.password ?? '', user.password, (err, isPwdMatched) => {
                if (err) return res.json({ error: true, message: "an error occured while checking password" })
                if (!isPwdMatched) {
                    res.json({ error: true, incorrectPwd: true, message: "incorrect password" })
                } else {
                    const { _id, email, } = user;
                    delete user.password
                    const token = JWT.sign({ _id, email, provider: singin.provider }, secret);
                    res.json({ success: true, token, user: { ...user._doc, password: '🔒🔒🔒🔒' } })
                }
            });
        }

    }
}
