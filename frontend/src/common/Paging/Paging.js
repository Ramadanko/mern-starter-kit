import React, { useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'

const Paging = ({ count }) => {

  let history = useHistory()
  let params = queryString.parse(history.location.search)
  let [defaultPage] = useState(parseInt(params.page) || 1)

  const updateQueryString = (event, value) => {
    let queryStringObject = queryString.parse(history.location.search)
    queryStringObject.page = value
    let parsedQueryString = queryString.stringify(queryStringObject)
    history.push({ search: parsedQueryString })
  }

  return (
    count > 1 ?
      <Pagination color="secondary" shape="rounded" size="small"
                  id="pagination" count={count} defaultPage={defaultPage} onChange={updateQueryString}/> :
      null
  )
}

export default Paging
