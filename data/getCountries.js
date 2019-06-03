const fs = require('fs');
const parse = require('csv-parse');
const readline = require('readline');
const path = require('path');

const countriesFile = path.join(__dirname, 'raw/countries.csv');

function getCountries() {
  return new Promise((resolve, reject) => {
    try {
      const countries = [];

      const rl = readline.createInterface({
        input: fs.createReadStream(countriesFile, {
          encoding: 'utf-8',
          start: 953, // Skip header line
        }),
        crlfDelay: Infinity,
      });

      rl.on('line', line => {
        parse(
          line,
          { delimiter: ',', trim: true, skip_empty_lines: true },
          (err, output) => {
            const code = output[0][6];
            const name = output[0][27];
            if (code) countries.push({ code, name });
          }
        );
      });

      rl.on('close', () => {
        resolve(countries);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getCountries;
