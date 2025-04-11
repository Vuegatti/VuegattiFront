import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://vuegatti.glitch.me/',
  timeout: 5000,
})

export default apiClient
