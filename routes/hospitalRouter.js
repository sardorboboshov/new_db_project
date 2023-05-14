import express from 'express';
import {
  getAllHospitals,
  createDoctors,
} from '../controllers/hospitalController.js';

const router = express.Router();
router.route('/hospitals').get(getAllHospitals);
router.route('/doctors-create').post(createDoctors);

export default router;
