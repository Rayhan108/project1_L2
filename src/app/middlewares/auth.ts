import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from "../utils/catchAsync";
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import confiq from '../confiq';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';


const auth = (...requireRoles:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const token = req.headers.authorization;
  //check if token sent from the client
  if(!token){
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
  }

  //check if the token is 
  let decoded;
  try{

    decoded = jwt.verify(token,confiq.jwt_access_secret as string)as JwtPayload
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }catch(err){
    throw new AppError(httpStatus.UNAUTHORIZED,"unauthorized")
  }
// console.log(decoded);
const {role,userId,iat}=decoded
  const user = await UserModel.isUserExistsByCustomId(userId);
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

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }


      if(requireRoles && !requireRoles.includes(role)){
        throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
      }
      req.user=decoded as JwtPayload;
      next();
       })
}
export default auth