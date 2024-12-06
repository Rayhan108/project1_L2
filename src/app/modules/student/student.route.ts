import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();



router.get('/', StudentControllers.getAllStudents);
router.delete('/:studentId', StudentControllers.deleteStudent);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
    '/:studentId',
    validateRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateStudent,
  );
export const StudentRoutes = router;