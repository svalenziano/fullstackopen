import axios from 'axios'

const baseURL = '/api/persons'

function getAll() {
  const fake = {
    id:"-1",
    name: "Fakity Fake",
    number: "555-5555",
  }
  return axios.get(baseURL, {
    headers: {
      "Accept": "application/json;charset=utf-8"
    }
  })
    .then(res => res.data.concat(fake));
}

function create(data) {
  return axios.post(baseURL, data)
    .then(res => res.data);
}

function update(id, data) {
  return axios.patch(baseURL + `/${id}`, data)
    .then(res => res.data);
}

function del(id) {
  return axios.delete(`${baseURL}/${id}`)
    .then(res => res.data);
}

export default {
  getAll,
  create,
  update,
  del,
}