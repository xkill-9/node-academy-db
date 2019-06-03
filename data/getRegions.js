const fs = require('fs');
const readline = require('readline');
const path = require('path');

const regionsFile = path.join(__dirname, 'raw/regions.txt');

function getRegions() {
  return new Promise((resolve, reject) => {
    try {
      const regions = [];

      const rl = readline.createInterface({
        input: fs.createReadStream(regionsFile, {
          encoding: 'utf-8',
        }),
        crlfDelay: Infinity,
      });

      rl.on('line', line => {
        const info = line.split('\t');
        const code = info[0]; // CountryCode.ID eg: C0.02 === Antioquia
        const country = info[0].split('.')[0];
        const name = info[2];
        regions.push({ code, country, name });
      });

      rl.on('close', () => {
        resolve(regions);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getRegions;
