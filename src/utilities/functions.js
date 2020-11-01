export const buildObjectToSave = (body, keys) => {
  let data = {}
  keys.map(key => {
    if (body.hasOwnProperty(key)) {
      data[key] = body[key]
    }
  })
  return data
}

const sortByValues = {
  'createdAt': {createdAt: 1}, 
  '-createdAt': {createdAt: -1}, 
  'title': {title: 1}, 
  '-title': {title: -1}
}

export const defaultFilter = (query) => {
  const page = query.page && parseInt(query.page) ? parseInt(query.page) - 1 : 0
  const limit = query.limit && parseInt(query.limit) ? parseInt(query.limit) : 10
  const sortBy = query.sortBy && sortByValues[query.sortBy] ? sortByValues[query.sortBy] : 'createdAt'
  return { page, limit, sortBy }
}
