import { StudentModel } from './student.model';




const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()  .populate('admissionSemister')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });;
  return result;
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
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
 
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
