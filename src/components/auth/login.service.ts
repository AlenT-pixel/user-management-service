import { login } from "./auth.controller";
import { findUserFromToken, signJwt } from "../../utils/auth.utils";
import bcrypt from "bcrypt";
import userDal from "../user/user.dal";

export const loginUser = async (req: any, res: any) => {
    const { password } = req
    try {
        const response: any = await login(req, res);
        if (!response) {
            return {
                message: "Incorrect credentials",
                status: false,
                statusCode: 200,
            };
        }

        const comparePassword = async (password1: any, password2: any) => {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, response.password, (err, result) => {
                    console.log("passwords", password, response.password);
                    
                    if (err) {
                        reject({
                            message: "Internal server error",
                            status: false,
                            statusCode: 200,
                        });
                    }

                    if (!result) {
                        reject({
                            message: "Incorrect password",
                            status: false,
                            statusCode: 200,
                        });
                    }
                    const access_token = signJwt(response);
                    resolve({
                        message: "Success",
                        status: true,
                        statusCode: 200,
                        user: {
                            'username': response.username,
                            'email': response.email,
                            'role': response.role
                        },
                        data: {
                            access_token
                        }
                    });
                });
            });
        };
        const comparison = await comparePassword(password, response.password);
        return comparison;
    } catch (error: any) {
        return {
            message: error.message,
            status: false,
            statusCode: 500,
        };
    }
}