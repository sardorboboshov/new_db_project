const db_map = {
  patient: 'patients',
  doctor: 'doctors',
  symptom: 'symptoms',
  diseases: 'diseases',
  tests: 'tests',
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
  symptom: 'symptom_id, symptom_name',
};
export const getUserSQL = () => {
  return `
  SELECT * from users
  WHERE id = ?
  `;
};

export const orgUserSql = (db_map, id_map, arr_map, user) => {
  console.log(db_map[user.userType], id_map[user.userType]);
  return `
  SELECT ${arr_map[user.userType]}
  FROM users left join ${db_map[user.userType]} ON users.id = ${
    db_map[user.userType]
  }.${id_map[user.userType]}
  WHERE users.id = ?
  `;
};

export const genUserBody = (type, body, ID) => {
  if (type === 'patient') {
    return {
      P_ID: ID,
      insurance: body.insurance,
      allergy: body.allergy,
    };
  }
  return {
    D_ID: ID,
    hos_id: body.hos_id,
    specializations: body.specializations,
    qualification: body.qualification,
    experience: body.experience,
  };
};

export const fetchOnlyUserBody = (body) => {
  return {
    name: body.name,
    surname: body.surname,
    birthday: body.birthday,
    userType: body.userType,
    mail: body.mail,
    phone_number: body.phone_number,
  };
};

export function insertUserTypeQuery(body, ID) {
  // console.log(body);
  if (body && body.userType === 'patient') {
    return [
      `
    INSERT into patients values(?,?,?)
    `,
      [ID, body.insurance, body.allergy],
    ];
  }
  return [
    `
  INSERT into doctors values(?,?,?,?,?)
  `,
    [
      ID,
      body.hos_id,
      body.specializations,
      body.qualification,
      body.experience,
    ],
  ];
}

export const getHospitalsSQL = 'SELECT * from hospitals';
export const insertDCs = 'INSERT into doctors values(?,?,?,?,?)';
