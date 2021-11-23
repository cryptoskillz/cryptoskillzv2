require('dotenv').config();
//debug
//console.log(process.env.SANITYPROJECTID)

//mark down module
/*
const toMarkdown = require('@sanity/block-content-to-markdown')
//seralizers
const serializers = {
  types: {
    code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
  }
}
*/

const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h


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



const serializers = {
  types: {
    code: props => (
      h('pre', {className: props.node.language},
        h('code', props.node.code),
        h('image: props =&gt; &lt;img ... /&gt;')
      )
    )
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

  //for markdown
  //posts[0]._body = toMarkdown(posts[0].body, {serializers})
  
  //for html
  posts[0]._body= blocksToHtml({
    blocks: posts[0].body,
    serializers: serializers
  })

  //build an  image URL 
  //note : we know there is a way to do this cleaner but I have hacked it for now
  let _imageurl = `https://cdn.sanity.io/images/${process.env.SANITYPROJECTID}/production/`;
  let _image = posts[0].mainImage.asset._ref;
  _image = _image.replace("image-","")
  _image = _image.replace("-png",".png")
  posts[0]._mainImage = _imageurl+_image
  //debug
  //console.log("posts")
  //console.log(posts)
  //console.dir(posts[0].body)
  //console.log(posts[0])
  //console.log(posts[0]._mainImage)
  return {
        postsArray: posts
  }

}
