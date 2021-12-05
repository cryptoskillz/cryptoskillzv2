export async function onRequest(context) {
  // Contents of context object
  

  
    try {

        const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;


      //const ALLOW_TEST = (context.env.ALLOW_TEST === "True");
      //console.log(ALLOW_TEST)
      const KV = context.env.ALLOW_TEST;
      //console.log(KV)
      //const key = await KV.get("wah22")
      //console.log(key)
      //console.log(context)
      //KV.delete("wah22")
      KV.put("Whan", "is the best",{})
      const value = await KV.list()
      console.log(value)
      //console.log(context.env)
      //let json = JSON.stringify(context)
      return new Response('boo');
  } catch (err) {
      let json = JSON.stringify(context)
      return new Response(json);
  }

}
