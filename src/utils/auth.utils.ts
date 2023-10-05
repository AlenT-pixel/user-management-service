import jwt, { JwtPayload, sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";

const secretKey = "iqqsSUK4nSN6yw8ZRCzl5MuWzISGXPEaLLLL";

export const signJwt = (user: any): string => {
    const payload = { id: user.id };
    return sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await compare(password, hashedPassword);
};

export const findUserFromToken = async (req: any) => {
    const token = req.token.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    const payload = decodedToken?.payload;
    const userId = (payload as JwtPayload).id
    return userId;
}

export const hashPassword = async (data: any) => {
    const response = bcrypt.genSalt(10, async (err: any, salt: any) => {
        if (err) {
            return {
                message: err.message,
                status: false,
                statusCode: 500,
            };
        };
        const response: any = bcrypt.hash(data, salt, async (err: any, hash: any) => {
            if (err) {
                return {
                    message: err.message,
                    status: false,
                    statusCode: 500,
                };
            }
            const password = await hash;
            return password;
        });

    });
}

export const generateRecoveryToken = (userId: any) => {
    // const token = signJwt({ id: userId });
    // return token;
    const token = jwt.sign({ id:userId }, secretKey, {
        expiresIn: "10m", // Token expires in 1 hour
      });
      return token;
  };