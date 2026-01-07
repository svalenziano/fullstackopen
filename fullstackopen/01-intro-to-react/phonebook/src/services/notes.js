import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

function getAll() {
  return axios.get(baseURL)
    .then(res => res.data);
}

function create(data) {
  return axios.post(baseURL, data)
    .then(res => res.data);
}


export default {
  getAll,
  create,
}