export const joiValidation = async (schema: any, data: any) => {
  try {
    const value = await schema.validateAsync(data);
    return {
      message: "Success",
      status: true,
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      message: err.details[0].message,
      status: false,
      statusCode: 500,
    };
  }
};
