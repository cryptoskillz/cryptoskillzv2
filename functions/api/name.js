export async function onRequest(context) {
  // Contents of context object
  /*
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  */
    try {
      //const ALLOW_TEST = (context.env.ALLOW_TEST === "True");
      //console.log(ALLOW_TEST)
      const KV = context.env.CFKVDB;
      //console.log(KV)
      //const key = await KV.get("wah22")
      //console.log(key)
      //console.log(context)
      //KV.delete("wah22")
      //KV.put("wah22", "gah",{})
      const value = await KV.list()
      //console.log(value)
      //console.log(context)
      return new Response(value.list_complete);
  } catch (err) {
      return new Response(err);
  }

}
