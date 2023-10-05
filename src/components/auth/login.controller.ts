import Joi from "joi";
import { joiValidation } from "../../utils/validation_service";

import * as loginService from "./login.service";
import { log } from "console";

export const login = async (req: any, res: any) => {
    try {
        /*  to validate the data using joi validation */
        const schema = Joi.object({
            username: Joi.string().min(3).max(30).required().label("User Name"),
            password: Joi.string().min(3).max(30).required().label("Password")
        });
        const validation: any = await joiValidation(schema, req);
        if (!validation.status) {
            return res.json(validation);
        }
        const response: any = await loginService.loginUser(req, res);
        return res.json(response);
    } catch (error) {
        return res.json(error);
    }
}