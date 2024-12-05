import express from 'express';
import { UsersController } from './user.controller';

import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router()


router.post('/create-student',
    validateRequest(studentValidations.createStudentValidationSchema), 
    UsersController.createStudent);
export const UserRoutes=router;