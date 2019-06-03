# Node Academy - Final Test Database

This package helps you set up the database for Node Academy's final project.

## Installation

You'll need to clone or download this repo and install all its dependencies.

```bash
git clone https://github.com/xkill-9/node-academy-db.git
cd node-academy-db
npm install
```

## Setup

This app connects to a MySQL database and populates it with all the data needed for the project, to connect to your database you'll need to provide a **.env** file with the following variables:

```bash
DB_HOST='localhost'
DB_USER='your_db_user'
DB_PASSWORD='your_db_user_password'
DB_NAME='your_db_name'
```

You'll need to install MySQL in your machine and set up a database to connect to, if you don't have one already you can read the docs on how to install and configure MySQL:

- [Installing MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
- [MySQL Tutorial](https://dev.mysql.com/doc/refman/8.0/en/tutorial.html)

## Running the app

With the environment variables correctly set on your **.env** file you can now run:

```bash
npm run mysql
```

This will create the necessary tables (countries, regions, cities and sisters), read the data files and populate the database, you should see a progress bar for each table being populated and a success message when the process finishes, you can go to your terminal and access mysql to check that all the data was inserted correctly.

Remember that the sisters table will be empty by default and is up to you to implement the REST API to be able to populate it.

_NOTE: You might notice the total of cities shown when running the app is a little higher than the ones inserted in the database, this is completely fine, some entries do not conform to the foreign key rules we've setup in the database schema so they are skipped._

## Database

### Schema

The schema for our database follows the instructions detailed in the [final project document](https://github.com/xkill-9/node-academy-db/blob/master/final-project.md), all the table names are lowercase and the structure of each table is as follows:

#### countries

| Key  | Data Type    | Primary Key | References |
| ---- | ------------ | ----------- | ---------- |
| code | VARCHAR(255) | Yes         |            |
| name | VARCHAR(255) |             |            |

#### regions

| Key     | Data Type    | Primary Key | References      |
| ------- | ------------ | ----------- | --------------- |
| code    | VARCHAR(255) | Yes         |                 |
| name    | VARCHAR(255) |             |                 |
| country | VARCHAR(255) |             | countries(code) |

#### cities

| Key        | Data Type    | Primary Key | References      |
| ---------- | ------------ | ----------- | --------------- |
| code       | VARCHAR(255) | Yes         |                 |
| name       | VARCHAR(255) |             |                 |
| latitude   | DECIMAL      |             |                 |
| longitude  | DECIMAL      |             |                 |
| population | INTEGER      |             |                 |
| region     | VARCHAR(255) |             | regions(code)   |
| country    | VARCHAR(255) |             | countries(code) |

#### sisters

| Key   | Data Type    | Primary Key | References   |
| ----- | ------------ | ----------- | ------------ |
| city1 | VARCHAR(255) |             | cities(code) |
| city2 | VARCHAR(255) |             | cities(code) |

### Example

Here we'll use Bilbao and Medellin, which happen to be sister cities, to show how our database would look like:

Our `countries` table:

| code | name     |
| ---- | -------- |
| CO   | Colombia |
| ES   | España   |

`regions` table:

| code  | name           | country |
| ----- | -------------- | ------- |
| CO.02 | Antioquia      | CO      |
| ES.59 | Basque Country | ES      |

Note that region names do **not** have acute accents (_eg:_ Antioqu**í**a), region codes are composed of the country's code and a numeric id (_eg_: **CO**.**02**), and the country code corresponds exactly to an entry in our countries table.

`cities` table:

| code    | name     | latitude | longitude | population | region | country |
| ------- | -------- | -------- | --------- | ---------- | ------ | ------- |
| 3674962 | Medellin | 6.25184  | -75.56359 | 1999979    | CO.02  | CO      |
| 3128026 | Bilbao   | 43.26271 | -2.92528  | 48020      | ES.59  | ES      |

Note again that the `name` does **not** have acute accents and that the values of both `region` and `country` correspond directly to an entry in the respective tables.

`sisters` table:

| city1   | city2   |
| ------- | ------- |
| 3674962 | 3128026 |
