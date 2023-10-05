import userDal from "./user.dal";
import bcrypt from "bcrypt";

export const addUser = async (userData: any) => {
    try {
        const userDetails: any = await userDal.verifyUser(userData);
        if (userDetails.data) {
            return {
                message: "User already exist",
                status: false,
                statusCode: 200,
            };
        }
        // bcrypt.genSalt(10, (err, salt) => {
        //     if (err) {
        //         return {
        //             message: err.message,
        //             status: false,
        //             statusCode: 500,
        //         };
        //     };
        //     bcrypt.hash(userData.password, salt, async (err, hash) => {
        //         if (err) {
        //             return {
        //                 message: err.message,
        //                 status: false,
        //                 statusCode: 500,
        //             };
        //         }
        //         userData.password = hash;
        //     });
        // });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt);
        userData.password = hash;
        const response: any = await userDal.addUser(userData);
        return response;
    } catch (error: any) {
        return {
            message: error.message,
            status: false,
            statusCode: 500,
        };
    }
}

export const getUsers = async (filterResult: any) => {
    try {
        const response: any = await userDal.getUsers(
            filterResult
        );
        return response;
    } catch (error: any) {
        return {
            message: error.message,
            status: false,
            statusCode: 500,
        };
    }
};

export const getUserById = async (req: any) => {
    const user_id: string = req.id;
    try {
        const userDetails: any = await userDal.getUserById(
            user_id
        );
        if (!userDetails.data) {
            return {
                message: "User not found",
                status: false,
                statusCode: 500,
            };
        }
        return userDetails;
    } catch (error: any) {
        return {
            message: error.message,
            status: false,
            statusCode: 500,
        };
    }
}

export const updateUser = async (userData: any) => {
    try {
        let userId: string = userData.id!;
        const userDetails: any = await userDal.getUserById(
            userId
        );
        if (!userDetails.data) {
            return {
                message: "User not found",
                status: false,
                statusCode: 500,
            };
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt);
        userData.password = hash;
        const response: any = await userDal.updateUser(
            userData
        );
        return response;
    } catch (error: any) {
        return {
            message: error.message,
            status: false,
            statusCode: 500,
        };
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const userDetails: any = userDal.getUserById(userId);
        if (!userDetails) {
            return {
                message: "User Not Found",
                status: false,
                statusCode: 500
            }
        }
        const response: any = await userDal.deleteUser(userId);
        return response;
    } catch (error: any) {
        return {
            message: error.message,
            status: false,
            statusCode: 500,
        };
    }
}