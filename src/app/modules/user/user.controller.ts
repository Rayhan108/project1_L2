// import studentValidationSchema from "../student/student.joi.validation";

import { UserServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { RequestHandler } from "express";
const createStudent:RequestHandler = async (req, res,next) => {
    try {
 
  
      const { password,student: studentData } = req.body;
      // data validation using zod
  
    //   const zodparsedData = studentValidationSchema.parse(studentData);
  
      const result = await UserServices.createStudentIntoDB(password,studentData);
  
     
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result,
      });
    } catch (err) {
    next(err)
    }
  };
  export const UsersController={
    createStudent
  }