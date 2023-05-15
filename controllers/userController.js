import catchAsync from '../utils/catchAsync.js';
import pool from '../database.js';
import {
  orgUserSql,
  getUserSQL,
  insertUserTypeQuery,
  fetchOnlyUserBody,
} from '../queries.js';
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

const spec_map = {
  patient: 'insurance, allergy',
  doctor: 'hos_id, specializations,qualification,experience',
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

export const insertUsers = catchAsync(async (req, res, next) => {
  const [patients] = await pool.query(
    'SELECT * FROM users where userType = ?',
    ['patient']
  );

  for (const patient of patients) {
    if (patient.ID === 1) continue;
    await pool.query('INSERT into patients values(?,?,?)', [
      patient.ID,
      'none',
      'none',
    ]);
  }
  res.status(200).json({
    status: 'success',
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const user = req.body;
  if (!user.userType)
    res.status(400).json({
      status: 'fail, probably missing one/more fields',
    });
  const [rows] = await pool.query('SELECT * FROM users where mail = ?', [
    user.mail,
  ]);
  if (rows.length > 0) {
    res.status(200).json({
      status: 'success',
      data: {
        user: rows[0],
      },
    });
  } else {
    const [result] = await pool.query('INSERT into users SET ?', [
      fetchOnlyUserBody(user),
    ]);
    user.ID = result.insertId;
    const [query, arr] = insertUserTypeQuery(req.body, user.ID);
    // console.log(query, arr);
    const [result2] = await pool.query(query, arr);
    res.status(200).json({
      status: 'success',
      data: {
        user: result2[0],
      },
    });
  }
});

