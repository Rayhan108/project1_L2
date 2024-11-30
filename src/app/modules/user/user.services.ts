import confiq from '../../confiq';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';

import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  userData.password = password || (confiq.default_pass as string);

  //set user role
  userData.role = 'student';
  //manually generated id
  userData.id = '20301000001';

//create user
  const newUser = await UserModel.create(userData); //build in static method
  //create student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; //embadding id
    studentData.user = newUser._id; //ref id
    const newStudent = await StudentModel.create(studentData)
    return newStudent;
  }
  
};
export const UserServices = {
  createStudentIntoDB,
};
