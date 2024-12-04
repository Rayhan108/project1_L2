import { model, Schema } from 'mongoose';

import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemister.constant';
import { TAcademicSemester } from './academicSemister.interface';



const acdemicSemesterSchema = new Schema<TAcademicSemester>(
    {
      name: {
        type: String,
        required: true,
        enum: AcademicSemesterName,
      },
      year: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode,
      },
      startMonth: {
        type: String,
        required: true,
        enum: Months,
      },
      endMonth: {
        type: String,
        required: true,
        enum: Months,
      },
    },
    {
      timestamps: true,
    },
  );




export const AcademicSemisterModel = model<TAcademicSemester>('AcademicSemister', acdemicSemesterSchema);
