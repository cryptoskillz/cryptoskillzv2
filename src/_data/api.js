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
    try {
        var res = await superagent.get(env.API_URL+ "/blog-articles/").query({})
        //check we got a response.
        if (res.ok) {
            //console.log(res.body)
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