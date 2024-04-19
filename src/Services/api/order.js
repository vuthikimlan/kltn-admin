import axios from "../request"

export const getListOrder = () => {
    return axios.get('/order/getAll')
}

export const getOrderById = (_id) => {
    return axios.get(`/order/${_id}`)
}

export const updateOrder = (_id, values) => {
    return axios.put(`/order/${_id}`, values)
}

export const deleteOrder = (_id) => {
    return axios.delete(`/order/${_id}`)
}

export const filterOrder = (values) => {
    const OrderValues = {
        orderCode: values.orderCode,
        status: values.status, 
    }
    return axios.post('/order/filter', OrderValues)
}