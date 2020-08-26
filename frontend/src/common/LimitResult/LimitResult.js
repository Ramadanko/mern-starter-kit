import React, { useState } from 'react'
import {
  Select,
  MenuItem,
  Grid,
  InputLabel
} from '@material-ui/core'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'
import SortIcon from '@material-ui/icons/Sort'

const options = [
  { name: '1', value: '1' },
  { name: '5', value: '5' },
  { name: '10', value: '10' },
  { name: '25', value: '25' },
  { name: '50', value: '50' },
  { name: '100', value: '100' }
]

export default ({ callback }) => {

  let history = useHistory()
  let params = queryString.parse(history.location.search)
  let [limit, setLimit] = useState(params.limit || options[2].value)

  const updateQueryString = (e) => {
    let value = e.target.value
    setLimit(value)
    let queryStringObject = queryString.parse(history.location.search)
    queryStringObject.limit = value
    let parsedQueryString = queryString.stringify(queryStringObject)
    history.push({ search: parsedQueryString })
    callback()
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item><SortIcon /></Grid>
      <Grid item>
        <InputLabel htmlFor="limitResult">Items per page:</InputLabel>
      </Grid>
      <Grid item>
        <Select id="limitResult" value={limit} onChange={updateQueryString}>
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
      </Grid>
    </Grid>
  )
}
