### Install
* npm install -g grunt-cli
* npm install -g bower
* npm install

### Run
* grunt

### Logging

Data is logged whenever the user clicks the mouse anywhere on the screen or hits any key. This includes screens for which particular interactions have no effect (e.g. hitting right key on control view).

#### Log Fields
* **interaction**
  * Description: Specifies the event which triggered the log entry.
  * Values:
    * instructionClick
    * prevClick
    * nextClick
    * unknownClick
    * doneClick
    * upKey
    * leftKey
    * downKey
    * rightKey
    * unknownKey
* **interactionDelta**
  * Description: Duration, in milliseconds, since last interaction event.
* **intent**
  * Description: This is the inferred intention of the interaction event.
  * Values:
    * unknown (set if interaction is unknownClick or unknownKey)
    * setStep (set if interaction is instructionClick)
    * prevStep (set if interaction is prevClick, upKey, or leftKey)
    * nextStep (set if interaction is nextClick, downKey, or rightKey)
    * done (set if interaction is doneClick)
* **intentSuccess**
  * Description: true if intent matches up with expected value for stepDelta. Otherwise false.
* **stepDelta**
  * Description: The relative change in step number. For example, clicking next on Step 1 will produce stepDelta=1; hitting the left arrow key on Step one will produce stepDelta=0.
  * Values: Anything in the interval [0, n-1].
* **step**
  * Description: The step during which this log entry occurred. For example, if I switch to step 2 while on step 1, this value will be 1. This is always a number between 1 and n. Note that it's not 0-based (it's not the same as stepIndex).
* **stepDuration**
  * Description: The duration, in milliseconds, of how long the logged step has been viewed. In other words, the duration given is for the step on which this log entry occurred. This value is reset to 0 whenever a log entry occurs with non-zero stepDelta.
* **totalDuration**
  * Description: The total duration, in milliseconds, that has elapsed. This value is never reset. This field gives the total time that it took to cook the recipe when the *done* event is fired.

### Group links

#### Group 1
* http://localhost:8080/?interface=control&recipe=eggs&group=1
* http://localhost:8080/?interface=sbs&recipe=lasagna&group=1
* http://localhost:8080/?interface=responsive&recipe=risotto&group=1

#### Group 2
* http://localhost:8080/?interface=control&recipe=risotto&group=2
* http://localhost:8080/?interface=sbs&recipe=eggs&group=2
* http://localhost:8080/?interface=responsive&recipe=lasagna&group=2

#### Group 3
* http://localhost:8080/?interface=control&recipe=lasagna&group=3
* http://localhost:8080/?interface=sbs&recipe=risotto&group=3
* http://localhost:8080/?interface=responsive&recipe=eggs&group=3

### General notes on query params
* To pick a recipe, use http://localhost:8080/?recipe=Ravioli
* To pick an interface, use http://localhost:8080/?interface=sbs
* To reset a session, use http://localhost:8080/?reset=1
* To debug, use http://localhost:8080/?debug=1