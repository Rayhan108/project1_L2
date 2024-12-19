import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';
import confiq from '../../confiq';



const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: confiq.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
        accessToken,
        needsPasswordChange,
      }
  });
});

const changePassword = catchAsync(async (req, res) => {

    const {...passwordData}=req.body;
  const result = await AuthServices.changePassword(req.user,passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated succesfully!',
    data:result
  });
});



export const AuthControllers = {
  loginUser,
  changePassword
};
