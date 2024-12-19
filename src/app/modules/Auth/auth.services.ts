import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
//check if the user is exists
const user = await UserModel.isUserExistsByCustomId(payload.id);
 if(! await UserModel.isUserExistsByCustomId(payload?.id)){
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







 //access granted send access token & refress token

return {}

};



export const AuthServices = {
  loginUser,
  
};
