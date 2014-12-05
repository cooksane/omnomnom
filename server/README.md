Install packages:
* npm install -g grunt-cli
* npm install -g bower
* npm install

Run:
* node start.js
* node start-testdb.js

Database (Mongo):
* dbs
  * omnomnom-test
  * omnomnom
* collections
  * logs
  * nasas
  * surveys

Description:
* Samples BigOven data via /search/ path.
* Gets data from various collections via /{collection}/{session}, or data on entire collection via /{collection}.
  * Examples:
    * /logs
    * /logs/24bb439908458157c6655cf200c1bde64c29f7c1

Sample Recipe:
* node tests/test-api "{search}" {mode}

Examples:
* node tests/test-api "Ravioli Basil" any
* node tests/test-api "French" title
* node tests/test-api "Cookies"
