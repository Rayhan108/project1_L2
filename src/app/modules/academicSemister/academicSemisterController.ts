
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemisterServices } from './academicSemisterServices';

const createAcademicSemister = catchAsync(async (req, res) => {

  const result = await AcademicSemisterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is created succesfully',
    data: result,
  });
});
export const AcademicSemisterController = {
  createAcademicSemister,
};
