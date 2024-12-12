import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';




const getAllStudentsFromDB = async (query: Record<string,unknown>) => {
  const queryObj = {...query}
  // console.log(query,queryObj);
  const studentSearchableFields =['email','name.firstName','name.lastName','contactNo']
  let searchTerm ='';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery =StudentModel.find({
    $or:studentSearchableFields.map((field)=>({
      [field]:{$regex:searchTerm,$options:'i'}
    }))
  }) 
  //filtering
  const excludeFields = ['searchTerm','sort','limit','page','fields'];
  excludeFields.forEach((el)=>{delete queryObj[el]});
  const filterQuery = searchQuery.find(queryObj).populate('admissionSemister')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });;
let sort ='-createdAt'
if(query.sort){
sort = query.sort as string;
}

const sortQuery =filterQuery.sort(sort);
let page =1;
let limit =1;
let skip =0;
if(query.limit){
  limit =Number(query.limit) ;
}
if(query.page){
  page =Number(query.page) ;
  skip = (page-1)*limit;
}
const paginateQuery = sortQuery.skip(skip);
const limitQuery =  paginateQuery.limit(limit);
let fields='-__v';
if(query.fields){
  fields = (query.fields as string).split(',').join(' ')
}
const filedsQuery =await limitQuery.select(fields)
  return filedsQuery;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id }).populate('admissionSemister').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });

  return result;
};


const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try{
 session.startTransaction();
 //transaction -1
 const deletedStudent = await StudentModel.findOneAndUpdate({ id }, { isDeleted: true },{new:true,session});
if(!deletedStudent){
  throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete student")
}
 //transaction -2
const deletedUser = await UserModel.findOneAndUpdate({ id }, { isDeleted: true },{new:true,session});
if(!deletedUser){
  throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete user")
}



await session.commitTransaction();
 await session.endSession();
 return deletedStudent;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Student deleted unsuccessfull")
  }

};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};







export const StudentServices = {
 
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB
};
