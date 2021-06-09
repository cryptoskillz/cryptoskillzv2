# 11tyStaticFramework
11ty Static site framework with most of the toys needed for modern static webapp.

## Prerequisites

npm i 

manually install packages (if "npm i" fails) 

sudo npm install @11ty/eleventy -g

sudo npm install uglifycss -g

## Usage

run ./build.sh from the command line with the one of the following paramaters

./build.sh local

run a http server in the output/HTML dir and you will be able to work with the site locally

Note CI will run buld.sh stage and prod when you push so you should only use the 2 command below if you want to test these enviorments locally.

./build.sh stage

./build.sh prod



this will create a folder called src which contains the output files in static HTML Including all of the JSS/CSS combined into one file and minified 

to push this to the staging environment, create a branch called staging-name and this will push everything in the staging directory to our staging S3 bucket
  
To push this to this production enviorment, create a pull request and merge this into master this will push everything in the src directory our production S3 bucket.  

The assets folder will be pushed to our staging/production CDN respectively.

The templates will be pushed to a bucket called handlebars


## Post deploy

CI runs this postdeploy script on staging and production but if you would like to run it manually then type the following.

Staging:

node postdeploy.js stage
 
Production:
 
node postdeploy.js prod



