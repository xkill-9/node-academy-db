const fs = require('fs');
const readline = require('readline');
const path = require('path');

const citiesFile = path.join(__dirname, 'raw/cities.txt');

function getCities() {
  return new Promise((resolve, reject) => {
    try {
      const cities = [];

      const rl = readline.createInterface({
        input: fs.createReadStream(citiesFile, {
          encoding: 'utf-8',
        }),
        crlfDelay: Infinity,
      });

      rl.on('line', line => {
        const info = line.split('\t');
        const code = info[0];
        const name = info[2];
        const latitude = parseFloat(info[4]);
        const longitude = parseFloat(info[5]);
        const population = parseInt(info[14]);
        const country = info[8];
        const region = `${country}.${info[10]}`; // Region ids have the form CountryCode.ID eg: C0.02 === Antioquia
        cities.push({
          code,
          name,
          latitude,
          longitude,
          population,
          region,
          country,
        });
      });

      rl.on('close', () => {
        resolve(cities);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getCities;
