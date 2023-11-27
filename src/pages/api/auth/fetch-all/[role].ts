import { NextApiRequest, NextApiResponse } from "next";
import { User, UserModel } from "../../../../models/user";

export default async function FetchUsers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const role = req.query.role || [];
    const users:any = await UserModel.find().where({ role }).exec()
    if (users) {
        userMapper(users)
        return res.status(200).json({
            success: true,
            users
        })
    }
}

function userMapper(users: User[]) {
    const mapped = users.map((user) => {
        user.password = '🔒🔒🔒🔒'
    })

    console.log(mapped)
}