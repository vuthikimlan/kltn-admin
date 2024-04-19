import axios from "../request"

export const createDiscount = (values) => {
    return axios.post('/discount/create', values)
}

export const getListDiscount = () => {
    return axios.get('/discount/getAll')
}

export const getDiscountById = (_id) => {
    return axios.get(`/discount/${_id}`)
}

export const updateDiscount = (_id, values) => {
    const data = {
        discountCode: values.discountCode,
        active: true,
       expiryDate: values.expiryDate,
       discountRate: values.discountRate
    }
    return axios.put(`/discount/${_id}`, data)
}

export const deleteDiscount = (_id) => {
    return axios.delete(`/discount/${_id}`)
}

export const filterDiscount = (values) => {
    const DiscountValues = {
        discountCode: values.discountCode,
        status: values.status, 
    }
    return axios.post('/discount/filter', DiscountValues)
}