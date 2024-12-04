import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;