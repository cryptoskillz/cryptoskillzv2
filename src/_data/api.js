//API Data preprocessing can happen here 

const superagent = require('superagent');
let env = require('./env')


//this function gets some date from and API which can be used in the data processing, for simpluicty stakes it is connection to our auctions endpoint so you can see
//it in action 


let getSomething = async () => {
    try {
        var res = await superagent.get(env.API_URL+ "blog-articles/").query({})
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
    console.log(functionResults)
    return {
        articlesArray: functionResults
    }
    
}