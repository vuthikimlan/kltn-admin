import axios from "../request"

export const login  = ({username, password}) => {
    return axios.post('/auth/login', {username, password})
}