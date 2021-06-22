//API Data preprocessing can happen here 

const superagent = require('superagent');
let env = require('./env')


//this function gets some date from and API which can be used in the data processing, for simpluicty stakes it is connection to our auctions endpoint so you can see
//it in action 

let getImages = async () => {
    try {
        var res = await superagent.get(env.API_URL+ "/upload/files/").query({})
        //check we got a response.
        if (res.ok) {
            let images = res.body;
            for (var i = 0; i < images.length; i++) {
                //console.log(images[i].url);
                var http = require('http'),                                                
                    Stream = require('stream').Transform,                                  
                    fs = require('fs');                                                    

                var url = env.API_URL+images[i].url   
                //console.log(url)   
                //console.log('output/HTML/assets/images'+images[i].url);           
                let imagename = images[i].url;

                http.request(url, function(response) {                                        
                  var data = new Stream();                                                    

                  response.on('data', function(chunk) {                                       
                    data.push(chunk);                                                         
                  });                                                                         

                  response.on('end', function() {     
                    console.log('hhh output/HTML/assets/images'+imagename )                                        
                    fs.writeFileSync('output/HTML/assets/images'+imagename   , data.read());                               
                  });                                                                         
                }).end();
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