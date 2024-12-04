
import { academicSemesterNameCodeMapper } from "./academicSemister.constant";
import { TAcademicSemester } from "./academicSemister.interface";
import { AcademicSemisterModel } from "./academicSemister.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // semester name --> semester code
    // academicSemesterNameCodeMapper['Fall']==03
    //payload.name==>user provided semister name
    //payload.code==>user provided semister code

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemisterModel.create(payload);
    return result;
  };

  const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemisterModel.find();
    return result;
  };
  
  const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemisterModel.findById(id);
    return result;
  };
  
  const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemisterModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
  

  export const AcademicSemisterServices={
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
  }