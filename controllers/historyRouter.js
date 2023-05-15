import catchAsync from '../utils/catchAsync.js';
import pool from '../database.js';

export const getAllHistory = catchAsync(async (req, res, next) => {
  const [rows] = await pool.query('SELECT * FROM history');
  res.status(200).json({
    status: 'success',
    data: {
      history: rows,
    },
  });
});
