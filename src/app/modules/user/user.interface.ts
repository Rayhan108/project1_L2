/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser{
id:string;
password:string,
needsPasswordChange?:boolean;
role: 'student' | 'faculty' | 'admin';
status:'in-progress' | 'blocked';
isDeleted:boolean;

}
export interface User extends Model<TUser>{
    // myStaticMethod:number;
     //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;