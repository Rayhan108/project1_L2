import express from 'express';
import { UsersController } from './user.controller';

import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';


const router = express.Router()


router.post('/create-student',
    validateRequest(studentValidations.createStudentValidationSchema), 
    UsersController.createStudent);
    
    router.post(
        '/create-faculty',
        validateRequest(createFacultyValidationSchema),
        UsersController.createFaculty,
      );
      
      router.post(
        '/create-admin',
        validateRequest(createAdminValidationSchema),
        UsersController.createAdmin,
      );


export const UserRoutes=router;