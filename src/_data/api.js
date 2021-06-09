//API Data preprocessing can happen here 

const superagent = require('superagent');
let env = require('./env')


//this function gets some date from and API which can be used in the data processing, for simpluicty stakes it is connection to our auctions endpoint so you can see
//it in action 
let getSomething = async () => {

    try {
        var res = await superagent.get(env.API_URL + 'v2/auctions/').query({
            'limit': '10'
        });
        var resultsArray = res.body.results;
        var hasNextPage = !!(res.body.next)
        var nextPageURL = res.body.next;
        while (hasNextPage) {
            var nextPage = await superagent.get(nextPageURL);
            hasNextPage = !!(nextPage.body.next)
            nextPageURL = nextPage.body.next
            resultsArray = resultsArray.concat(nextPage.body.results)
        }
        //console.log('Built auctions array with ' + resultsArray.length + ' auctions');
        //figure out live auctions
        return resultsArray;
    } catch (err) {
        console.log('Error getting auctions:')
        console.error(err)
    }

}


module.exports = async () => {
    /*
    let functionResults = [];
    if (functionResults.length === 0) functionResults = await getSomething();
    
    return {
        functionResultsArray: functionResults
    }
    */
}