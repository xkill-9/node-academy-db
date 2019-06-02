const CREATE_COUNTRIES_TABLE = `
  CREATE TABLE IF NOT EXISTS countries (
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (code)
  )
  `;
const CREATE_REGIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS regions (
    country VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY(code),
    FOREIGN KEY (country) REFERENCES countries(code)
  )
`;
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
const CREATE_SISTERS_TABLE = `
  CREATE TABLE IF NOT EXISTS sisters(
    city1 VARCHAR(255) NOT NULL,
    city2 VARCHAR(255) NOT NULL,
    FOREIGN KEY (city1) REFERENCES cities(code),
    FOREIGN KEY (city1) REFERENCES cities(code)
  )
`;

module.exports = {
  CREATE_COUNTRIES_TABLE,
  CREATE_CITIES_TABLE,
  CREATE_SISTERS_TABLE,
  CREATE_REGIONS_TABLE,
};
