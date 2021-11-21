/*

add your enviorment files to a .env file in the root


SANITYPROJECTID=""
SANITYDATASET=""
SANITYAPIVERSION=""
SANITYTOKEN=""

to use them the api.js

process.env.SANITYPROJECTID,
process.env.SANITYDATASET,
process.env.SANITYAPIVERSION,
process.env.SANITYTOKEN,

*/
require('dotenv').config();


let todaysDate = new Date();
let _YEAR = todaysDate.getFullYear(); 

module.exports = {
    YEAR:_YEAR
}