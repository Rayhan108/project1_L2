import express from 'express';
import { AcademicSemisterController } from './academicSemisterController';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemister.validation';


const router = express.Router()


router.post('/create-academic-semister',validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema),AcademicSemisterController.createAcademicSemister);

router.get(
    '/:semesterId',
    AcademicSemisterController.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemisterController.updateAcademicSemester,
  );
  
  router.get('/', AcademicSemisterController.getAllAcademicSemesters);

export const AcademicSemisterRoutes=router;