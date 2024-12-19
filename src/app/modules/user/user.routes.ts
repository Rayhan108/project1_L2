import express from 'express';
import { UsersController } from './user.controller';

import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';


const router = express.Router()


router.post('/create-student',auth(USER_ROLE.admin),
    validateRequest(studentValidations.createStudentValidationSchema), 
    UsersController.createStudent);
    
    router.post(
        '/create-faculty',auth(USER_ROLE.admin),
        validateRequest(createFacultyValidationSchema),
        UsersController.createFaculty,
      );
      
      router.post(
        '/create-admin',auth(USER_ROLE.admin),
        validateRequest(createAdminValidationSchema),
        UsersController.createAdmin,
      );


export const UserRoutes=router;