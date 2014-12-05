Install:
* npm install -g grunt-cli
* npm install -g bower
* npm install

Run:
* grunt

General notes on URL:
* To pick a recipe, use http://localhost:8080/?recipe=Ravioli
* To pick an interface, use http://localhost:8080/?interface=sbs
* To reset a session, use http://localhost:8080/?reset=1
* To debug, use http://localhost:8080/?debug=1

Group 1
http://localhost:8080/?interface=control&recipe=eggs
http://localhost:8080/?interface=sbs&recipe=lasagna
http://localhost:8080/?interface=responsive&recipe=risotto

Group 2
http://localhost:8080/?interface=control&recipe=risotto
http://localhost:8080/?interface=sbs&recipe=eggs
http://localhost:8080/?interface=responsive&recipe=lasagna

Group 3
http://localhost:8080/?interface=control&recipe=lasagna
http://localhost:8080/?interface=sbs&recipe=risotto
http://localhost:8080/?interface=responsive&recipe=eggs