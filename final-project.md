# Node Academy Medellin

## Description

You are required to implement a RESTful interface to work with a set of tables that provide geographical information about countries, regions, and cities. This package handles creating the schema and tables for the project.

The list of countries should be based upon data from https://github.com/datasets/country-codes pruned down to just the country two-character code (as in the ISO 3166-1 norm) and name. For regions and cities, you should use GeoNames' data from http://download.geonames.org/export/dump/​ in particular, **admin1CodesASCII.txt** for regions, and **cities15000.zip** for cities.

What you need to know about these three tables is as follows:

- Countries are identified by a two-letter code (such as `UY` for Uruguay, or `CO` for Colombia), and have a nam.
- Regions belong to a country, have a name, and are identified by the country code, plus a string. (eg: The id for Antioquia is `CO.02`)
- Cities are identified by a numeric code, have a name, latitude and longitude, population, and are in a region of a country.

Additionally, we want to be able to represent the concept of “sister cities” (or “twin towns”) in which two distinct cities from different countries establish a relationship; see https://en.wikipedia.org/wiki/Sister_city for more on the concept. This relationship is symmetrical: if city A is sister of city B, then it follows that city B is sister of city A - and the fact shouldn't be entered twice in the DB. A city may be twinned with more than one city: see for example https://en.wikipedia.org/wiki/Montevideo#Twin_towns_and_sister_cities for the many sister cities of Montevideo, Uruguay. However, if city A is sister of city B, and city B is sister of city C, this doesn't imply any kind of relationship between city A and city C; they need not be sisters.

## Requirements

The following are the requirements that need to be met by the end of the training process:

- Build a RESTful API that handles all resources mentioned in the description. For example, valid routes and methods for regions should be the following, and you must define the other needed ones:

  - `GET` `/regions` will provide all regions of all countries
  - `GET` `/regions/:country` will return all regions of the given country
  - `GET` `/regions/:country/:region` will return a single region
  - `DELETE` `/regions/:country/:region` will let us delete a given region
  - `POST` `/regions/:country` will allow us to create a new region for a country
  - `PUT` `/regions/:country/:region` will let us create or update a given region

- Dealing with countries and cities is quite similar, with some exceptions:

  - Because of the size of the result set, we won't accept `GET` `/cities` requests to provide all cities in the world; only `GET` `/cities/:city` will be permitted. The other request would send back a `405` status code, Method not allowed, unless a query is included; see text at the bottom.

- Since country codes cannot be assigned at will, we won't allow `POST` `/countries`. Instead, `PUT` `/countries/:country` will be required to add a new country, as well as for updating an existing one.

- For sister cities, paths would be `/sisters` (all sisters pairs), `/sisters/:cityA` (sisters of the given city) and `/sisters/:cityA/:cityB` (a specific sister pair) - and note that the latter should be equivalent to `/sisters/:cityB/:cityA`

- Each type of request will produce the appropriate HTTP status codes. No updates that violate foreign key rules should be allowed. (This applies to all operations: for example, you cannot delete a region that has cities, or insert a city with no country.) Also, GET requests will be sent JSON results, and POST requests will be sent the location of the newly created entity.

- Build all CRUD methods for all resources managed by the API

- Add logging support as follows:

  - Info and debug messages should be printed out to stdout and a single file called info.log
  - Error and Warning messages will be written into a single error.log file
  - Request information and response time

- The main logic behind the API must be unit tested up to a healthy 90% code coverage.

- You should allow queries such as `/cities?country=UY` and `/cities?country=UY&region=10` to find all cities for a country or a region.

- Implement HATEOAS everywhere.
