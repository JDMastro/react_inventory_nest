import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    update : async (url : string, body: any) => await instance.put(url, body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    turninto : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
}

export const ConversionRequest =
{
    getAll : async () => await Requests.getAll(`conversion`),
    create : async (body: any) => await Requests.create('conversion',body),
    update : async (id : number, body : any) => await Requests.update(`conversion/${id}`,body),
    delete : async (id: number) => await Requests.delete(`conversion/${id}`),
    turninto : async (body: any) => await Requests.create('conversion/turninto',body),
}