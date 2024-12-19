import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import { createToken } from './auth.utils';
import confiq from '../../confiq';

const loginUser = async (payload: TLoginUser) => {
//check if the user is exists
const user = await UserModel.isUserExistsByCustomId(payload.id);
 if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"This user is not found!")
 }
 //check if the user is already deleted
 const isDeleted = user?.isDeleted
 if(isDeleted){
    throw new AppError(httpStatus.FORBIDDEN,"This user is already deleted!") 
 }
 //check if the user is blocked
 const userStatus = user?.status
 if(userStatus === 'blocked'){
    throw new AppError(httpStatus.FORBIDDEN,"This user is blocked!") 
 }
//  //checking if the pass is correct 
if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');


 //create token and sent to the  client

 const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload,confiq.jwt_access_secret as string,
    {expiresIn:'10d'},

)
//   const accessToken = createToken(
//     jwtPayload,
//     confiq.jwt_access_secret as string,
//     confiq.jwt_access_expires_in as string,
//   );

//   const refreshToken = createToken(
//     jwtPayload,
//     confiq.jwt_refresh_secret as string,
//     confiq.jwt_refresh_expires_in as string,
//   );


return {accessToken,needsPasswordChange:user?.needsPasswordChange}

};



export const AuthServices = {
  loginUser,
  
};
