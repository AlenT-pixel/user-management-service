import { User } from "../../models/user";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

class UserDal {
    public async verifyUser(userData: any) {
        try {
            const response: Promise<any> = new Promise((resolve, reject) => {
                User.findAndCountAll({
                    where: {
                        [Op.or]: [
                            { email: userData.email },
                            { username: userData.username }
                        ]
                    },
                })
                    .then((res: any) => {
                        resolve({
                            data: res.count,
                            message: "Success",
                            status: true,
                            statusCode: 200,
                        });
                    })
                    .catch((err: any) => {
                        reject({
                            message: err.message,
                            status: false,
                            statusCode: 500,
                        });
                    });
            });
            return response;
        } catch (error: any) {
            return {
                message: error.message,
                status: false,
                statusCode: 500,
            };
        }
    }

    /** function for add user */

    public async addUser(userData: any) {
        try {

            userData.id = uuidv4();
            const response: Promise<any> = new Promise((resolve, reject) => {
                bcrypt.genSalt(10, (err: any, salt: any) => {
                    if (err) {
                        return {
                            message: err.message,
                            status: false,
                            statusCode: 500,
                        };
                    };
                        if (err) {
                            return {
                                message: err.message,
                                status: false,
                                statusCode: 500,
                            };
                        }
                        User.create(userData)
                            .then((res) => {
                                resolve({
                                    message: "Success",
                                    status: true,
                                    statusCode: 200,
                                });
                            })
                            .catch((err: any) => {
                                reject({
                                    message: err.message,
                                    status: false,
                                    statusCode: 500,
                                });
                            });
                });
            });
            return response;
        } catch (error: any) {
            return {
                message: error.message,
                status: false,
                statusCode: 500,
            };
        }
    }

    public async getUsers(filterResult: any) {
        const page = parseInt(filterResult?.page);
        const count = parseInt(filterResult?.count);
        try {
            const offset = (page - 1) * count;
            const limit = count;
            const response: Promise<any> = new Promise((resolve, reject) => {
                User.findAndCountAll({ 
                    offset,
                    limit,
                    attributes: ['id', 'username', 'email', 'role'] })
                    .then((res: any) => {
                        if (!res.count) {
                            resolve({
                                message: "users not found",
                                data: [],
                                count: 0,
                                status: false,
                                statusCode: 500,
                            });
                        }
                        resolve({
                            message: "Success",
                            data: res.rows,
                            count: res.count,
                            status: true,
                            statusCode: 200,
                        });
                    })
                    .catch((err: any) => {
                        reject({
                            message: err.message,
                            status: false,
                            statusCode: 500,
                        });
                    });
            });
            return response;
        } catch (error: any) {
            return {
                message: error.message,
                status: false,
                statusCode: 500,
            };
        }
    }

    public async getUserById(userId: any) {
        try {
            const response: Promise<any> = new Promise((resolve, reject) => {
                User.findByPk(userId)
                    .then((res) => {
                        resolve({
                            data: res,
                            message: "Success",
                            status: true,
                            statusCode: 200,
                        });
                    })
                    .catch((err: any) => {
                        reject({
                            message: err.message,
                            status: false,
                            statusCode: 500,
                        });
                    });
            });
            return response;
        } catch (error: any) {
            return {
                message: error.message,
                status: false,
                statusCode: 500,
            };
        }
    }

    /** function for update user */

    public async updateUser(userData: any) {
        try {
            const response: Promise<any> = new Promise((resolve, reject) => {
                User.update(
                    {
                        username: userData.username,
                        email: userData.email,
                        role: userData.role,
                        password: userData.password
                    },
                    {
                        where: {
                            id: userData.id,
                        },
                    }
                )
                    .then((res) => {
                        resolve({
                            message: "Success",
                            status: true,
                            statusCode: 200,
                        });
                    })
                    .catch((err: any) => {
                        reject({
                            message: err.message,
                            status: false,
                            statusCode: 500,
                        });
                    });
            });
            return response;
        } catch (error: any) {
            return {
                message: error.message,
                status: false,
                statusCode: 500,
            };
        }
    }

    public async deleteUser(userId: string) {
        try {
            const response: Promise<any> = new Promise((resolve, reject) => {
                User.destroy({
                    where: {
                        id: userId,
                    },
                })
                    .then((res) => {
                        resolve({
                            message: "Success",
                            status: true,
                            statusCode: 200,
                        });
                    })
                    .catch((error: any) => {
                        reject({
                            message: error.message,
                            status: false,
                            statusCode: 500,
                        });
                    });
            });
            return response;
        } catch (error: any) {
            return {
                message: error.message,
                status: false,
                statusCode: 500,
            };
        }
    }
}

export = new UserDal();