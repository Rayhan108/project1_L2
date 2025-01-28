import express from 'express';
import { AcademicSemisterController } from './academicSemisterController';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemister.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semister',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemisterController.createAcademicSemister,
);

router.get(
  '/:semesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemisterController.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemisterController.updateAcademicSemester,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemisterController.getAllAcademicSemesters,
);

export const AcademicSemisterRoutes = router;
