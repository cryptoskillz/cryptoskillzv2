addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

export async function handleRequest(request) {
  const value = await CZBLOG.list()

  return new Response(value.keys)
}