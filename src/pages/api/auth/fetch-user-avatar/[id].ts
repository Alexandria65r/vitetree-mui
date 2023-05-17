import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../database/schema";
import { User as TypedUser } from "../../../../reusable/interfaces";
import { ObjMapperSingle } from "../../../../database/objectMapper";


export default async function FetchUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const _id = req.query.id || [];
    const userDoc = await User.findById({ _id })
    const user: TypedUser = ObjMapperSingle(userDoc)

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

