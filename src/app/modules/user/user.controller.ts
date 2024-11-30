// import studentValidationSchema from "../student/student.joi.validation";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudent = async (req: Request, res: Response,next:NextFunction) => {
    try {
 
  
      const { password,student: studentData } = req.body;
      // data validation using zod
  
    //   const zodparsedData = studentValidationSchema.parse(studentData);
  
      const result = await UserServices.createStudentIntoDB(password,studentData);
  
     
  
      res.send({
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