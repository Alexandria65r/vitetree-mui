
import jwt from "jsonwebtoken";
import { ObjMapperSingle } from "../../../database/objectMapper";
import { User, UserModel } from "../../../models/user";
import { NextApiRequest } from "next";
const JWT_SECRET: any = process.env.JWT_SECRET;

export async function GetAuthUser(req:NextApiRequest) {
    const token: any = req.headers.authorization;
    const decoded: any = await jwt.verify(token, JWT_SECRET);
    const rawUser: any = await UserModel.findOne({ email: decoded.email });
    if (rawUser) {
        const user: User = ObjMapperSingle(rawUser)
        return user
    }
}
