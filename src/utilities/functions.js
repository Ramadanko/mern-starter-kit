export const buildObjectToSave = (body, keys) => {
  let data = {}
  keys.map(key => {
    if (body.hasOwnProperty(key)) {
      data[key] = body[key]
    }
  })
  return data
}
