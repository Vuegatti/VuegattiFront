import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 5000,
})

export default apiClient
