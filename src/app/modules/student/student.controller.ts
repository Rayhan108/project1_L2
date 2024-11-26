import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

// import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //create schema using zod

    const { student: studentData } = req.body;
    // data validation using zod

    const zodparsedData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodparsedData);

    // data validation using Joi
    // const {error,value} =studentValidationSchema.validate(studentData);
    // console.log(error,value);
    // if(error){
    //   res.json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error:error.details,
    //   });
    // }

    res.sendStatus(200).json({
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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
