wipeOutOldBuild () {
    echo 'Wiping out old build directory'
    rm -rf ./_site/**
}

#delete the files in the site dir
wipeOutOldBuild
#run eleventy
eleventy 