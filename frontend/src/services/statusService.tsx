import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    update : async (url : string, body: any) => await instance.put(url, body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    getAllNumberOrdersbyStatus : async (url: string) => await instance.get(url).then(responseBody),
    getAllnumberOrders : async (url: string) => await instance.get(url).then(responseBody),
}

export const StatusRequest =
{
    getAll : async () => await Requests.getAll(`status`),
    create : async (body: any) => await Requests.create('status',body),
    update : async (id : number, body : any) => await Requests.update(`status/${id}`,body),
    delete : async (id: number) => await Requests.delete(`status/${id}`),
    getAllNumberOrdersbyStatus : async (status_id : number, person_id : number) => await Requests.getAllNumberOrdersbyStatus(`status/getAllNumberOrdersbyStatus/${status_id}/${person_id}`),
    getAllnumberOrders : async (number_order : number) => await Requests.getAllnumberOrders(`status/getAllnumberOrders/${number_order}`),
}