import express from 'express';
// import getAllUsers from '../controllers/userController.js';

import {
  getAllUsers,
  getUser,
  createUser,
  insertUsers,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/users').get(getAllUsers).post(createUser);
router.route('/users-insert').post(insertUsers);
router.route('/users/:id').get(getUser);
export default router;
