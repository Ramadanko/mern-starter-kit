import axios from 'axios';
import apiEndpoints from '../../common/Api/ApiEndpoints'

export const getTasks = (queryString) => {
  let url = queryString ? apiEndpoints.task + queryString : apiEndpoints.task;
  return axios.get(url)
}

export const getTaskById = (id) => {
  return axios.get(apiEndpoints.task + `/${id}`)
}
