Install:
* npm install -g grunt-cli
* npm install -g bower
* npm install

Run:
* grunt

Mongo:
* db = omnomnom
* collections
  * ???

TODOs:
* Implement Step By Step Interface
* Implement RecipeResponsive Interface

URL Notes:
* To sample recipe, use http://localhost:8080/?recipe=Ravioli
* To pick an interface, use http://localhost:8080/?interface=sbs
* To reset a session, use http://localhost:8080/?reset=1
* To debug, use http://localhost:8080/?debug=1

Currently does nothing:
* To start the program in group1 mode, use http://localhost:8080/?group=1
* To start the program in group0 mode, use http://localhost:8080/?group=0

Notes:
* Sampling a recipe works by running a search on the bigoven api, and returning the top rated result.
