import { NextApiRequest, NextApiResponse } from "next";
import { ObjMapperSingle } from "../../../../database/objectMapper";
import { User, UserModel } from "../../../../models/user";


export default async function FetchUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const _id = req.query.id || [];
    const userDoc = await UserModel.findById({ _id })
    const user: User = ObjMapperSingle(userDoc)

    const firstNameFirstLater = user.firstName.slice(0, 1)
    const lastNameFirstLater = user.lastName.slice(0, 1)
    const initials = `${firstNameFirstLater} ${lastNameFirstLater}`

    if (user) {
        return res.status(200).json({
            success: true,
            userAvatar: {
                ...user.imageAsset,
                initials: initials.toUpperCase()
            }
        })
    }
}

