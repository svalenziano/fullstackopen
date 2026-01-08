import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

function getAll() {

  return axios.get(baseURL + "/api/all")
    .then(res => res.data);
}

function create(data) {
  // return axios.post(baseURL, data)
  //   .then(res => res.data);
}

function update(id, data) {
  // return axios.patch(baseURL + `/${id}`, data)
  //   .then(res => res.data);
}

function del(id) {
  // return axios.delete(`${baseURL}/${id}`)
  //   .then(res => res.data);
}

export default {
  getAll,
  create,
  update,
  del,
}