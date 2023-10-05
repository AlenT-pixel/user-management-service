import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const secretKey = "iqqsSUK4nSN6yw8ZRCzl5MuWzISGXPEaLLLL";

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey,
        },
        (jwtPayload, done) => {
            const user = User.findOne({ where: { id: jwtPayload.id } });

            if (!user) {
                return done(null, false, { message: "User not found" });
            }

            return done(null, user);
        }
    )
);

// export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
//         if (err) {
//             return next(err);
//         }

//         if (!user) {
//             return res.status(401).send({ message: "Unauthorized" });
//         }

//         req.user = user;
//         next();
//     })(req, res, next);
// };

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const tokenValue = token.split(" ")[1]; // Extract the token value (remove "Bearer " prefix)
      const decoded = jwt.verify(tokenValue, secretKey) as any; // Adjust the type of decoded payload as per your JWT payload structure
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };