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

export const getHospitalsSQL = 'SELECT * from hospitals';
