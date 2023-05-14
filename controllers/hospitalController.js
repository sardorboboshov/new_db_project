import catchAsync from '../utils/catchAsync.js';
import pool from '../database.js';
import { getHospitalsSQL } from '../queries.js';
export const getAllHospitals = catchAsync(async (req, res, next) => {
  const [rows] = await pool.query(getHospitalsSQL());
  res.status(200).json({
    status: 'success',
    data: {
      hospitals: rows[0],
    },
  });
});
