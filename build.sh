#!/bin/bash

# Detect param or set default to local:
if [ -z $1 ]
then
echo -e 'No environment param set.\n Defaulting to local'
export ELEVENTY_ENV='local'
else 
export ELEVENTY_ENV=$1
fi

# Functions:

removeOutputHTMLFileExtensions () {
for file in ./output/HTML/**.html
do
mv $file $( echo $file | sed s/\.[Hh][Tt][Mm][Ll]//g )
done
}

wipeOutOldBuild () {
    echo 'Wiping out old build directory'
    rm -rf ./output/**
}


#copyTemplates () {
#    mkdir -p output/templates/_includes
#    cp ./src/**.njk output/templates
#    cp ./src/_includes/*.njk output/templates/_includes
#}

copyImages () {
    #mkdir -p output/templates/_includes
    cp ../cms/public/uploads/* output/HTML/assets/images/uploads
 }

wipeOutOldBuild
eleventy --input ./src --output output/HTML
copyImages


#copyTemplates

# Removing this for now
# removeOutputHTMLFileExtensions 

if [[ $ELEVENTY_ENV == 'local' ]]
then
echo -e "[11tyStaticFramework] \033[92mLOCAL BUILD COMPLETE"; echo -e "\033[0m"
exit
fi
#todo fix this for prod
node minify.js
#todo getting a random uglify css error so disabled this command for now
#exitOnError
uglifycss output/HTML/assets/css/*.css > output/HTML/assets/css/bundle.css
#exitOnError
echo -e "[11tyStaticFramework] \033[92mBUILD COMPLETE"; echo -e "\033[0m"