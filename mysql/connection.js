const mysql = require('mysql2/promise');
const ProgressBar = require('progress');

const getCountries = require('../data/getCountries');
const getRegions = require('../data/getRegions');
const getCities = require('../data/getCities');
const {
  cities: cityQueries,
  regions: regionQueries,
  countries: countryQueries,
  sisters: sisterQueries,
} = require('./queries');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function main() {
  // Connect to database.
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  console.log(`Connected to ${DB_NAME}`);

  /**
   * Helper function that inserts a list of records in a table and displays a progress bar.
   *
   * @param {string} table - Name of the table (only used in the progress bar's label)
   * @param {string} insertQuery - MySQL insert query
   * @param {Object[]} records - List of records to be inserted in the table
   */
  function addRecords(table, insertQuery, records) {
    const progress = new ProgressBar(
      `Adding ${table} (:current/:total) [:bar] :percent`,
      { total: records.length }
    );

    records.forEach(async record => {
      await connection.query(insertQuery, record);
      progress.tick();
    });
  }

  try {
    // Countries
    await connection.query(countryQueries.create);
    console.log('Created countries table');
    const countries = await getCountries();
    addRecords('countries', countryQueries.insert, countries);

    // Regions
    await connection.query(regionQueries.create);
    console.log('Created regions table');
    const regions = await getRegions();
    addRecords('regions', regionQueries.insert, regions);

    // Cities
    await connection.query(cityQueries.create);
    console.log('Created cities table');
    const cities = await getCities();
    addRecords('cities', cityQueries.insert, cities);

    // Sisters
    await connection.query(sisterQueries.create);
    console.log('Created sisters table');
  } catch (error) {
    throw new Error(`Connection crashed with error: ${error.message}`);
  } finally {
    // Disconnect from database after performing all the queries.
    await connection.end();
    console.log(`Disconnected from ${DB_NAME}`);
  }
}

main()
  .then(() => {
    console.log('Project database successfully populated!!');
  })
  .catch(() => {
    console.log('Oops, something went wrong trying to populate the database');
  });
