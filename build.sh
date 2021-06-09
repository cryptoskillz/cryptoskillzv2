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

exitOnError () {
if [[ $? -ne 0 ]]
then
echo -ne 'A command exited with error status of: '; echo -ne $?; echo 'Exiting.'
exit 1
fi
}

# Build logic:

echo -e "[11tyStaticFramework] \033[1mSTARTING BUILD"; echo -e "\033[0m"

wipeOutOldBuild

eleventy --input ./src --output output/HTML

exitOnError

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

exitOnError

uglifycss output/HTML/assets/css/*.css > output/HTML/assets/css/bundle.css

exitOnError

echo -e "[11tyStaticFramework] \033[92mBUILD COMPLETE"; echo -e "\033[0m"