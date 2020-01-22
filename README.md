![Digiman](digiman.png)

# Digiman
A simple JSON to HTML form rendering tool.

## Contents
This repository contains source files for Digiman framework.

## Ownership
Team Pugwash

## Usage
Add the JS bundle file to your website with the HTML fixture from index.html.
Digiman will initialise automatically on page load.

You will need:
* GET endpoint for definition
* GET endpoint for state
* POST endpoint for state

## Requirements
NodeJS between 10.16.3 and 12.6.0
Chrome Headless

## Local Development
Run: `npm install && npm start`

Test: `npm run test:dev`

Local environment is ssing webpack dev server to serve the definition and save state of Digiman.

http://localhost:3000

----------------

## Creating Production Bundle
Create bundle: `npm run build`

Create bundle without styles: `npm run build:unstyled`

Test: `npm test`

----------------

## Verifying your bundle
Start the server: `npm run server`

http://localhost:3001