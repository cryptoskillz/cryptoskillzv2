require('dotenv').config();
console.log(process.env.SANITYPROJECTID)
/*
remove the comments when you have wired up the API



//mark down module
const toMarkdown = require('@sanity/block-content-to-markdown')
//sanitu client
const sanityClient = require('@sanity/client')
//configure sanity
const client = sanityClient({
  projectId: 'process.env.SANITYPROJECTID',
  dataset: 'process.env.SANITYDATASET',
  apiVersion: 'process.env.SANITYAPIVERSION', // use current UTC date - see "specifying API version"!
  token: 'process.env.SANITYTOKEN', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

//seralizers
const serializers = {
  types: {
    code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
  }
}


//async function to get the posts
getPosts = async () => {
  //build the query.  
  //note we want to ignore drafts. 
  const query = '*[_type == "post" ][!(_id in path("drafts.**"))]'
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
  //debug
  //console.log("posts")
  //console.log(toMarkdown(posts.body, {serializers}))
  //console.dir(posts)
  
  return {
        postsArray: posts
  }

}
*/