// import studentValidationSchema from "../student/student.joi.validation";
import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudent = async (req: Request, res: Response) => {
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
    } catch (err:any) {
      res.json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  };
  export const UsersController={
    createStudent
  }