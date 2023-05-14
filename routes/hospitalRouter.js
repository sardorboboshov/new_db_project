import express from 'express';
import { getAllHospitals } from '../controllers/hospitalController.js';


const router = express.Router();
router.route('/hospitals').get(getAllHospitals);

export default router;
