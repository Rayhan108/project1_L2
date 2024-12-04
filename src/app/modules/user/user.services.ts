import confiq from '../../confiq';

import { AcademicSemisterModel } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';

import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';


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

  //set  generated id
  userData.id = await generateStudentId(admissionSemester!);

//create user
  const newUser = await UserModel.create(userData); //build in static method
  //create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id; //embadding id
    payload.user = newUser._id; //ref id
    const newStudent = await StudentModel.create(payload)
    return newStudent;
  }
  
};
export const UserServices = {
  createStudentIntoDB,
};
