import express from 'express';
// import getAllUsers from '../controllers/userController.js';

import { getAllUsers, getUser } from '../controllers/userController.js';
const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/users/:id').get(getUser);
export default router;
