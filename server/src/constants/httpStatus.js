// constants/httpStatus.js
module.exports = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// create an const that i use to reutrn any response in that formt ,add pagination also 
module.exports = {
  success: (data , pagination = null,message) => ({
    success:true,
    status: 'success',
    message:message,
    data,
    pagination
  }),
  error: (message, statusCode) => ({
    status: 'error',
    success:false,
    message,
    code: statusCode
  })
};