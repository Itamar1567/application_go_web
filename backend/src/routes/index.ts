import { Router } from 'express';
import applicationRoutes from './applications.route'
import testRoute from './test.route'

const router = Router();

router.use('/test', testRoute)
router.use('/applications', applicationRoutes);

export default router;