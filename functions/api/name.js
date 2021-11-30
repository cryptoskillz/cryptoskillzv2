


export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
    env,
  } = context;


  try {
  	console.dir(env)
    console.log(env.test)
   	const value = await env.CZBLOG.list()
  } catch (err) {
  	//console.dir(context)
  	  //IMAGES: KVNamespace;

  	console.dir(context)
  	//console.log(params)

    return new Response(err);
  }

}


/*


addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

export async function handleRequest(request) {

  const value = await CZBLOG.list()
  return new Response(value.keys)
}
  let res;
  
  try {
    context.data.timestamp = Date.now()
    res = await context.next();
  } catch (err) {
    res = new Response('Oops!', { status: 500 })
  } finally {
    let delta = Date.now() - context.data.timestamp
    res.headers.set('x-response-timing', delta)
    return res
  }
  */