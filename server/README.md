Get/Install nvm:
https://github.com/creationix/nvm

Install node and npm:
nvm install 0.10.29 //if not already installed
nvm alias default 0.10.29 //if you want to use node 0.10.29 by default
nvm use 0.10.29

Install packages:
npm install

Run:
node app "{search}" {mode}

Examples:
node app "Ravioli Basil" any
node app "French" title
node app "Cookies"

Description:
Currently prints the top recipe result for the given keyword search.