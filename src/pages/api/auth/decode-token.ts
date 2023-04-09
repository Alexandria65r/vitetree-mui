import { User } from "../../../database/schema";
import connection from "../../../database/connection";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const JWT_SECRET: any = process.env.JWT_SECRET;

export default async function DecodeToken(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connection();
    const token: any = req.headers.authorization;
    const decoded: any = await jwt.verify(token, JWT_SECRET);
    if (!decoded) return res.json({ auth_error: true, status: "invalid_token" });
    const user: any = await User.findOne({ email: decoded.email });
    if (!user) return res.json({ error: true, message: "An error occured" });

    if (user) {
        res.json({ success: true, user: {...user._doc, password:'🔒🔒🔒🔒'} });
    }
}
