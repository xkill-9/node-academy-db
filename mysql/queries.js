const CREATE_COUNTRIES_TABLE = `
  CREATE TABLE IF NOT EXISTS countries (
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (code)
  )
`;
const INSERT_COUNTRY = 'INSERT IGNORE INTO countries SET ?';

const CREATE_REGIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS regions (
    country VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY(code),
    FOREIGN KEY (country) REFERENCES countries(code)
  )
`;
const INSERT_REGION = 'INSERT IGNORE INTO regions SET ?';

const CREATE_CITIES_TABLE = `
  CREATE TABLE IF NOT EXISTS cities (
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    latitude DECIMAL,
    longitude DECIMAL,
    population INTEGER,
    country VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (country) REFERENCES countries(code),
    FOREIGN KEY (region) REFERENCES regions(code)
  )
`;
const INSERT_CITY = 'INSERT IGNORE INTO cities SET ?';

const CREATE_SISTERS_TABLE = `
  CREATE TABLE IF NOT EXISTS sisters(
    city1 VARCHAR(255) NOT NULL,
    city2 VARCHAR(255) NOT NULL,
    FOREIGN KEY (city1) REFERENCES cities(code),
    FOREIGN KEY (city1) REFERENCES cities(code)
  )
`;

module.exports = {
  countries: {
    create: CREATE_COUNTRIES_TABLE,
    insert: INSERT_COUNTRY,
  },
  cities: {
    create: CREATE_CITIES_TABLE,
    insert: INSERT_CITY,
  },
  regions: {
    create: CREATE_REGIONS_TABLE,
    insert: INSERT_REGION,
  },
  sisters: {
    create: CREATE_SISTERS_TABLE,
  },
};
