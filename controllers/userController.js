import catchAsync from '../utils/catchAsync.js';
import pool from '../database.js';
import { orgUserSql, getUserSQL } from '../queries.js';
export const getAllUsers = catchAsync(async (req, res, next) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.status(200).json({
    status: 'success',
    data: {
      users: rows,
    },
  });
});

const db_map = {
  patient: 'patients',
  doctor: 'doctors',
};
const id_map = {
  patient: 'P_ID',
  doctor: 'D_ID',
};

const arr_map = {
  patient:
    'P_ID, name, surname, birthday, userType, mail, phone_number, insurance, allergy',
  doctor:
    'D_ID, name, surname, birthday, userType, mail, phone_number, hos_id, specializations,qualification,experience',
};

export const getUser = catchAsync(async (req, res, next) => {
  const [rows] = await pool.query(getUserSQL(), [req.params.id]);
  const user = rows[0];
  const orgUser = await pool.query(orgUserSql(db_map, id_map, arr_map, user), [
    req.params.id,
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      user: orgUser[0],
    },
  });
});
