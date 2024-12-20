import mongoose from 'mongoose';
import confiq from '../../confiq';
import httpStatus from 'http-status';
import { AcademicSemisterModel } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';

import { UserModel } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { FacultyModel } from '../Faculty/faculty.model';
import { AdminModel } from '../admin/admin.model';


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


const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (confiq.default_pass as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (confiq.default_pass as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



export const UserServices = {
  createStudentIntoDB,createAdminIntoDB,createFacultyIntoDB
};
