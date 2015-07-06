
Collect your recipes in the RecipeJS app online.

## Installing a minimum environment toolset

* Install [NodeJS](https://nodejs.org/), which includes the Node Package Manager [NPM](https://www.npmjs.com/), by visiting the homepage and clicking on the install button in order to download and install the latest binary for your operating system.
* Install the DVCS (distributed version control system) [Git](https://git-scm.com/) which also has binary packages for all operating systems on its homepage. Learn Git immediately by reading at least the first three chapters of the free online [Git Book](https://git-scm.com/book/en/v2)

## Global dependencies form unit testing throughout the course

There will be more shortly, but this is enough to get started. Other tools (like the Karma test runner) are automatically included locally when you provision your static server with the `npm install` command (see below). But as we'll see it's convenient to install the karma command-line interface globally as well:

````
npm install -g karma-cli
````

That way you don't have to execute `./node_modules/karma/bin/karma start` every time you run your tests. You can just do `karma`.

And we'll install `bower`, another package manager very commonly used in JavaScript projects.

````
npm install -g bower
````

## Instructions for reviewing each lesson's code.

````
# Clone repo
git clone https://github.com/victorkane/recipe-js.git
cd recipe-js/

# Provision static server
npm install

# Run server
node server.js

# Change to a branch lesson locally for the first time and run static server
git checkout --track origin/lesson01-01
node server.js

# Change to an already downloaded branch
git checkout lesson01-03
node server.js
````

## Instructions for performing the local testing for each lesson's code
