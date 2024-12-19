import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import  jwt,{ JwtPayload } from 'jsonwebtoken';

import confiq from '../../confiq';
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  //check if the user is exists
  const user = await UserModel.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  //check if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }
  //check if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  //  //checking if the pass is correct
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
//   const accessToken = jwt.sign(jwtPayload, confiq.jwt_access_secret as string, {
//     expiresIn: '10d',
//   });
    const accessToken = createToken(
      jwtPayload,
      confiq.jwt_access_secret as string,
      confiq.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      confiq.jwt_refresh_secret as string,
      confiq.jwt_refresh_expires_in as string,
    );

  return { accessToken,refreshToken,needsPasswordChange: user?.needsPasswordChange };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string, newPassword: string },
) => {
  const user = await UserModel.isUserExistsByCustomId(userData?.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  //check if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }
  //check if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  //  //checking if the pass is correct
  if (!(await UserModel.isPasswordMatched(payload?.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
// hashed password
const newHashedPassword =await bcrypt.hash(payload?.newPassword,Number(confiq.bcrypt_salt_rounds))



  await UserModel.findOneAndUpdate({
    id: userData.userId,
    role: userData.role,
  },
{
    password:newHashedPassword,
    needsPasswordChange:false,
    passwordChangedAt: new Date()
});

};
const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      confiq.jwt_refresh_secret as string,
    ) as JwtPayload;
  
    const { userId, iat } = decoded;
  
    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(userId);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    if (
      user.passwordChangedAt &&
      UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }
  
    const jwtPayload = {
      userId: user.id,
      role: user.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      confiq.jwt_access_secret as string,
      confiq.jwt_access_expires_in as string,
    );
  
    return {
      accessToken,
    };
  };
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken
};
