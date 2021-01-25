import * as jwt from "jsonwebtoken";

export class Jwt {
    public static getAuthToken(data: {userId: number}) {
        return jwt.sign(data, process.env.JWT_SECRET);
    }

    public static decodeAuhToken(token: string) {
        if (token) {
            try {
                return jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                return false;
            }
        }
        return false;
    }
}