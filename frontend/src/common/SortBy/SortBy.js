import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  Grid
} from '@material-ui/core'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'
import ImportExportIcon from '@material-ui/icons/ImportExport'


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
    <Grid container alignItems="center" spacing={1}>
      <Grid item><ImportExportIcon/></Grid>
      <Grid item><InputLabel htmlFor="sortBy" >Sort By:</InputLabel></Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  )
}
