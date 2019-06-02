const mysql = require('mysql');
const {
  CREATE_CITIES_TABLE,
  CREATE_COUNTRIES_TABLE,
  CREATE_REGIONS_TABLE,
  CREATE_SISTERS_TABLE,
} = require('./queries');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

connection.connect(error => {
  if (error) throw error;
  console.log(`Connected to ${DB_NAME}`);

  connection.query(CREATE_COUNTRIES_TABLE, error => {
    if (error) throw error;
    console.log('Created countries table');
  });
  connection.query(CREATE_REGIONS_TABLE, error => {
    if (error) throw error;
    console.log('Created regions table');
  });
  connection.query(CREATE_CITIES_TABLE, error => {
    if (error) throw error;
    console.log('Created cities table');
  });
  connection.query(CREATE_SISTERS_TABLE, error => {
    if (error) throw error;
    console.log('Created sisters table');
  });

  connection.end(error => {
    if (error) throw error;
    console.log(`Disconnected from ${DB_NAME}`);
  });
});
