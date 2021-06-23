//API Data preprocessing can happen here 

const superagent = require('superagent');
let env = require('./env')


//this function gets some date from and API which can be used in the data processing, for simpluicty stakes it is connection to our auctions endpoint so you can see
//it in action 

let getImages = async () => {
    console.log('getting images')
    try {
        var res = await superagent.get(env.API_URL+ "/upload/files/").query({})
        //check we got a response.
        if (res.ok) {
            let images = res.body;
            for (var i = 0; i < images.length; i++) {
                //console.log(images[i].url);
                var http = require('http')     
                var https = require('https');
                var usehttpmethod = 0; // default to http                                          
                Stream = require('stream').Transform                               
                fs = require('fs');                                                    
                let url;
                let imagename;


                if(images[i].url.indexOf("https://res.cloudinary.com/dfesv3sqc/image/upload/") >= 0) 
                {
                    //console.log('found')
                    usehttpmethod =1;
                    url = images[i].url  
                    imagenamearr = images[i].url.split("/");
                    //console.log(imagenamearr[7])
                    imagename = imagenamearr[7]
                }
                else
                {
                    //console.log('not found')
                    usehttpmethod =0;
                    url = env.API_URL+images[i].url
                    imagename = images[i].url;
                }
                
                //console.log(url)   
                //console.log(imagename)
                if (usehttpmethod == 1)
                {

                    https.request(url, function(response) {                                        
                      var data = new Stream();                                                    

                      response.on('data', function(chunk) {                                       
                        data.push(chunk);                                                         
                      });                                                                         

                      response.on('end', function() {     
                        //console.log('hhh output/HTML/assets/images/uploads/'+imagename )                                        
                        fs.writeFileSync('output/HTML/assets/images/uploads/'+imagename   , data.read());                               
                      });                                                                         
                    }).end();
                }
                else
                {
                    http.request(url, function(response) {                                        
                        var data = new Stream();                                                    

                        response.on('data', function(chunk) {                                       
                            data.push(chunk);                                                         
                        });                                                                         

                        response.on('end', function() {     
                            //console.log('hhh output/HTML/assets/images'+imagename )                                        
                            fs.writeFileSync('output/HTML/assets/images'+imagename   , data.read());                               
                        });                                                                         
                    }).end();
                }
            }
        }
    } catch (err) {
        console.log('Error getting something:')
        console.error(err)
    }
}

let getSomething = async () => {
    console.log('getting articles')
    try {
        var res = await superagent.get(env.API_URL+ "/blog-articles/").query({})
        //console.log(res.body)
        //check we got a response.
        if (res.ok) {
            let articles = res.body;
            
            for (var i = 0; i < articles.length; i++) {
                const regex = /upload\/(.*?)\)/gm;
                const str = articles[i].content
                let m;
                //we can clean this regex up but it is good enough for now
                while ((m = regex.exec(str)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
    
                    // The result can be accessed through the `m`-variable, we can clean th
                    m.forEach((match, groupIndex) => {
                        let tmp = "https://res.cloudinary.com/dfesv3sqc/image/upload/";
                        if (groupIndex == 1)
                        {
                            let tmpnamearr = match.split("/");
                            let tmpimagename = tmpnamearr[1]
                            //console.log(tmpimagename)
                            articles[i].content = articles[i].content.replace(tmp+match,env.ROOT_URL+"/assets/images/uploads/"+tmpimagename)
                            //console.log(tmp2)
                        }
                        //console.log(`Found match, group ${groupIndex}: ${match}`);
                    });

                }
            }
            return res.body;
        }
    } catch (err) {
        console.log('Error getting something:')
        console.error(err)
    }
}


module.exports = async () => {
    let functionResults = [];
    if (functionResults.length === 0) functionResults = await getSomething();

    getImages();

    //console.log(functionResults)
    return {
        articlesArray: functionResults
    }
    
}