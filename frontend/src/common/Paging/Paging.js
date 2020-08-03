import React, { useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'

const Paging = ({ count, loadData, ...props }) => {

  let history = useHistory();
  let params = queryString.parse(history.location.search);
  let [defaultPage] = useState(parseInt(params.page) || 1);

  const updateQueryString = (event, value) => {
    let queryStringObject = queryString.parse(history.location.search)
    queryStringObject.page = value;
    let parsedQueryString = queryString.stringify(queryStringObject)
    history.push({ search: parsedQueryString })
  }

  return (
    <Pagination id="pagination" count={count} defaultPage={defaultPage} onChange={updateQueryString} />
  )
}

export default Paging;
