import express from 'express';
import { UsersController } from './user.controller';
const router = express.Router()
router.post('/create-student', UsersController.createStudent);
export const UserRoutes=router;