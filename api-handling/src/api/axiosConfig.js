import axios from "axios"

const axiosInstance = axios.create({
      baseURL :"https://697addd30e6ff62c3c5a4d43.mockapi.io/",
      timeout:10000,
})

export default axiosInstance