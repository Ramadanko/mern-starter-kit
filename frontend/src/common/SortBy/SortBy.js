import React, { useState } from 'react';
import {
  Select,
  MenuItem
} from '@material-ui/core'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'

const options = [
  { name: "Date added (oldest)", value: 'createdAt' },
  { name: "Date added (newest)", value: '-createdAt' },
  { name: "Title (a-z)", value: 'title' },
  { name: "Title (z-a)", value: '-title' }
]

export default () => {

  let history = useHistory();
  let params = queryString.parse(history.location.search);
  let [sortBy, setSortBy] = useState(params.sortBy || options[0].value);

  const updateQueryString = (e) => {
    let value = e.target.value;
    setSortBy(value);
    let queryStringObject = queryString.parse(history.location.search)
    queryStringObject.sortBy = value;
    let parsedQueryString = queryString.stringify(queryStringObject)
    history.push({ search: parsedQueryString })
  }

  return (
    <Select id="sortBy" value={sortBy} onChange={updateQueryString}>
      {
        options.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          )
        })
      }
    </Select>
  )
}
