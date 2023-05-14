import catchAsync from '../utils/catchAsync.js';
import pool from '../database.js';
import { getHospitalsSQL, insertDCs } from '../queries.js';
export const getAllHospitals = catchAsync(async (req, res, next) => {
  const [rows] = await pool.query(getHospitalsSQL());
  res.status(200).json({
    status: 'success',
    data: {
      hospitals: rows[0],
    },
  });
});

export const createDoctors = catchAsync(async (req, res, next) => {
  // const hospitals = await pool.query('SELECT * FROM hospitals');
  const [doctors] = await pool.query('SELECT * FROM users where userType = ?', [
    'doctor',
  ]);
  // console.log(doctors);
  const doctor_qualifications = ['MBBS', 'MD', 'MS', 'DM', 'MCH', 'DNB'];
  for (const doctor of doctors) {
    const hos_id = Math.floor(Math.random() * 25) + 1;
    const hos = await pool.query('SELECT * FROM hospitals where hos_id = ?', [
      hos_id,
    ]);
    await pool.query('INSERT into doctors values(?,?,?,?,?)', [
      doctor.ID,
      hos_id,
      hos[0][0].specializations,
      doctor_qualifications[Math.floor(Math.random() * 6)],
      Math.floor(Math.random() * 10),
    ]);
  }
  res.status(200).json({
    status: 'success',
  });
});

export const getDoctors = catchAsync(async (req, res, next) => {
  const [doctors] = await pool.query('SELECT * FROM doctors');
  res.status(200).json({
    status: 'success',
    data: {
      doctors: doctors,
    },
  });
});
