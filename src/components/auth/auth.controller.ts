import { Request, Response } from "express";
import { User } from "../../models/user";
import { findUserFromToken, signJwt } from "../../utils/auth.utils";
import passport from "passport";
import jwt from "jsonwebtoken";
// import userDal from "../components/users/user.dal";

const secretKey = "iqqsSUK4nSN6yw8ZRCzl5MuWzISGXPEaLLLL";

export const login = (req: any, res: Response) => {
    const { username } = req;
    try {
        const response: Promise<any> = new Promise((resolve, reject) => {
            User.findOne({ where: { username: username } }).then((res: any) => {
                resolve(res);
            })
                .catch((err: any) => {
                    reject({
                        message: err.message,
                        status: false,
                        statusCode: 500,
                    });
                });
        })
        return response;

    } catch (error: any) {
        return {
            message: error.message,
            status: false,
            statusCode: 500,
        };
    }
}