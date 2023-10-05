import Joi from "joi";
import { joiValidation } from "../../utils/validation_service";

import * as userService from "./user.service";

export const addUser = async (userData: any, res: any) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required().label("User Name"),
      password: Joi.string().min(3).max(30).required().label("Password"),
      email: Joi.string().required().label("User Address"),
      role: Joi.string().label("role"),
    });
    const validation: any = await joiValidation(schema, userData);
    if (!validation.status) {
      return res.json(validation);
    }
    const response: any = await userService.addUser(userData);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
}

export const getUsers = async (filterResult: any, res: any) => {
  console.log('filterResult===>', filterResult);
  try {
    const response: any = await userService.getUsers(filterResult);
    return res.send(response);
  } catch (error) {
    return res.json(error);
  }
}

export const getUserById = async (filterResult: any, res: any) => {
  console.log('filterResult===>', filterResult);
  try {
    const response: any = await userService.getUserById(filterResult);
    return res.send(response);
  } catch (error) {
    return res.json(error);
  }
}

export const updateUser = async (userData: any, res: any) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required().label("ID"),
      username: Joi.string().min(3).max(30).required().label("User Name"),
      email: Joi.string().required().label("User Address"),
      role: Joi.string().label("role"),
      password: Joi.string().min(3).max(30).required().label("Password"),
    });
    const validation: any = await joiValidation(schema, userData);
    if (!validation.status) {
      return res.json(validation);
    }
    const response: any = await userService.updateUser(userData);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
}

export const deleteUser = async (userId: string, res: any) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required().label("ID")
    })
    const validation: any = await joiValidation(schema, { userId });
    if (!validation.status) {
      return res.json(validation);
    }
    const response: any = await userService.deleteUser(userId);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
}