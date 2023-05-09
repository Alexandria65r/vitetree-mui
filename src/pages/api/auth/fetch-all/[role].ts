import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../database/schema";
import { User as TypedUser } from "../../../../reusable/interfaces";


export default async function FetchUsers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const role = req.query.role || [];
    const users:any = await User.find().where({ role }).exec()
    if (users) {
        userMapper(users)
        return res.status(200).json({
            success: true,
            users
        })
    }
}

function userMapper(users: TypedUser[]) {
    const mapped = users.map((user) => {
        user.password = '🔒🔒🔒🔒'
    })

    console.log(mapped)
}