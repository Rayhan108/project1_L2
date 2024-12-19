import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from "../utils/catchAsync";
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import confiq from '../confiq';
import { TUserRole } from '../modules/user/user.interface';


const auth = (...requireRoles:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const token = req.headers.authorization;
  //check if token sent from the client
  if(!token){
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
  }
  //check if the token is valid
  jwt.verify(token,confiq.jwt_access_secret as string,function(err,decoded){
    if(err){
        throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
      }
      const role = (decoded as JwtPayload)?.role
      if(requireRoles && !requireRoles.includes(role)){
        throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
      }
      req.user=decoded as JwtPayload;
      next();
  })
       })
}
export default auth