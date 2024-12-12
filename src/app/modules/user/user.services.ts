import mongoose from 'mongoose';
import confiq from '../../confiq';
import httpStatus from 'http-status';
import { AcademicSemisterModel } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';

import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';


const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  userData.password = password || (confiq.default_pass as string);

  //set user role
  userData.role = 'student';


  // find academic semester info
  const admissionSemester = await AcademicSemisterModel.findById(
    payload.admissionSemister,
  );

  const session = await mongoose.startSession();

  try{
    session.startTransaction();
    //set  generated id
  userData.id = await generateStudentId(admissionSemester!);

  //create user transction -1
    const newUser = await UserModel.create([userData],{session}); //build in static method
    //create student
    if (!newUser.length) {
throw new AppError(httpStatus.BAD_REQUEST,"Failed to create user")
    }

      payload.id = newUser[0].id; //embadding id
      payload.user = newUser[0]._id; //ref id
      //create student transaction 2
      const newStudent = await StudentModel.create([payload],{session})
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST,"Failed to create Student")
            }
       await session.commitTransaction();
       await session.endSession(); 


      return newStudent;
    


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(err : any){
await session.abortTransaction();
await session.endSession();
throw new Error(err);
  }
  
};
export const UserServices = {
  createStudentIntoDB,
};
