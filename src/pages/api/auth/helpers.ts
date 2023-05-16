import { User } from "../../../database/schema";
import jwt from "jsonwebtoken";
import { User as TypedUser } from "../../../reusable/interfaces";
import { ObjMapperSingle } from "../../../database/objectMapper";
const JWT_SECRET: any = process.env.JWT_SECRET;

export async function GetAuthUser(token: string) {
    const decoded: any = await jwt.verify(token, JWT_SECRET);
    const rawUser: any = await User.findOne({ email: decoded.email });
    if (rawUser) {
        const user: TypedUser = ObjMapperSingle(rawUser)
        return user
    }
}
