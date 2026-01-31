export const send = (res, response, data = {}) => {
  return res.send({
    responseCode: response.code,
    responseMessage: response.message,
    responseData: data,
  });
};

export const setErrMsg = (param, response) => {
  return {
    code: response.code,
    message: `${param} ${response.message}`,
  };
};
