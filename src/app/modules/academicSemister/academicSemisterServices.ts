
import { academicSemesterNameCodeMapper } from "./academicSemister.constant";
import { TAcademicSemester } from "./academicSemister.interface";
import { AcademicSemisterModel } from "./academicSemister.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // semester name --> semester code
    // academicSemesterNameCodeMapper['Fall']

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemisterModel.create(payload);
    return result;
  };
  export const AcademicSemisterServices={
    createAcademicSemesterIntoDB
  }