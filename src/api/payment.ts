import {backendUrl} from '@/api/languages.ts';
import axios from 'axios';

export const createPayPalOrder = (ordersId: string[]) => {
    return axios.post(`${backendUrl}/paypal/create-paypal-order`, {
        order_id: ordersId
    })
}

export const capturePayPalOrder = (data) => {
    return axios.post(`${backendUrl}/paypal/capture-paypal-order`, {
        orderID: data.orderID
    })
}

export const deletePayPalID = (data) => {
    return axios.delete(`${backendUrl}/paypal/${data.orderID}`)
}
export const stripePayment = (order_ids: string[]) => {
    return  axios.post(`${backendUrl}/stripe`, {order_ids})
}
