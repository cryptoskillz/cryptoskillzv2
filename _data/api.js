require('dotenv').config();
//debug
//console.log(process.env.SANITYPROJECTID)




//sanitu client
const sanityClient = require('@sanity/client')
//configure sanity
const client = sanityClient({
  projectId: process.env.SANITYPROJECTID,
  dataset: process.env.SANITYDATASET,
  apiVersion: process.env.SANITYAPIVERSION, // use current UTC date - see "specifying API version"!
  token: process.env.SANITYTOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})



//async function to get the posts
getPosts = async () => {
  //build the query.  
  //note we want to ignore drafts. 
// const query = `*[_type == "post" ][!(_id in path("drafts.**"))]`
   const query = `*[_type == "post"] [!(_id in path("drafts.**"))]{
  title,
  "mainImage": mainImage.asset->url,
  body,
  author,
  slug
}`

  //build paramates object
  const params = {}
  //fetch the data
  var result = await client.fetch(query, params)
  return result;
}


module.exports = async () => {
  //set a posts variale
  let posts = []
  //call the get posts fuction
  if (posts.length === 0) posts =  await getPosts();
  return {
        postsArray: posts
  }

}
