import { instance, responseBody } from './axiosInstance'

const Requests = {
    createProvider : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    
}

export const MovementRequest =
{
    createProvider : async (body: any) => await Requests.createProvider('movements/provider',body),   
}