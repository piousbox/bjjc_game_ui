# React seed [![Build Status](https://travis-ci.org/badsyntax/react-seed.svg?branch=master)](https://travis-ci.org/badsyntax/react-seed)

* [Local CSS](https://github.com/webpack/css-loader#local-scope)
* Karma, mocha, chai & sinon for testing with mocking examples
* Basic flux architecture with app actions, stores and example web API usage
* React router ([feature/react-router](https://github.com/badsyntax/react-seed/tree/feature/react-router))
* Material UI ([feature/material-ui](https://github.com/badsyntax/react-seed/tree/feature/material-ui))

## Develop

20170517: I tried peact-google-maps, now trying google-maps-react

## Test

 npm run test-travis

## Install

dev port 8005 (conflicts with tomcat7 by default, so `sudo service tomcat7 stop`)

to setup tgm:

 git clone <your repo>
 npm install
 npm run build
 npm run start
 npm run test

look at package.json scripts to see the definition of each script. To run a script, do `npm run <script name>`

The environment definitions are in config/ folder, feel free to create your own. "development" environment is the local environment that can be overwritten. You can create your own "development_<username>" environment and expect it to never be overwritten by other users.

in ~/.bashrc or ~/.bash_profile:

 alias be='bundle exec '

You have to have local API running at localhost:3000, so do:

 cd <M3_ROOT> && be rails s

Port 8006

