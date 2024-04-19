import axios from "axios";
import Cookies from "js-cookie"

const base_url = "http://localhost:8000"

const login_path = "/auth/login"

// Add a request interceptor
axios.interceptors.request.use(function (req) {
    const token = Cookies.get("token")
    const newUrl = base_url + req.url
    const Authorization = (login_path === req.url || req.url.startsWith("client")) ? undefined : `Bearer ${token}`
    return{
        ...req,
        url: newUrl,
        headers: {
            ...req.headers,
            Authorization
        }
    } ;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default axios