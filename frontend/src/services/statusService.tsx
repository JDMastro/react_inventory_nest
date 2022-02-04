import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    findAllWithPagination : async (url : string) => await instance.get(url).then(responseBody),
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    update : async (url : string, body: any) => await instance.put(url, body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    getAllNumberOrdersbyStatus : async (url: string) => await instance.get(url).then(responseBody),
    getAllnumberOrders : async (url: string) => await instance.get(url).then(responseBody),
    findStatusEmployee : async (url: string) => await instance.get(url).then(responseBody),
}

export const StatusRequest =
{
    findAllWithPagination : async(queryParameters : any) => await Requests.findAllWithPagination(urlFormatRest('status/withpagination',queryParameters)),
    getAll : async () => await Requests.getAll(`status`),
    create : async (body: any) => await Requests.create('status',body),
    update : async (id : number, body : any) => await Requests.update(`status/${id}`,body),
    delete : async (id: number) => await Requests.delete(`status/${id}`),
    
    getAllNumberOrdersbyStatus : async (status_id : number, person_id : number) =>  await Requests.getAllNumberOrdersbyStatus(`status/getAllNumberOrdersbyStatus/${status_id}/${person_id}`),
    //getAllNumberOrdersbyStatus : async (status_id : number, queryParameters? : any) => await Requests.getAllNumberOrdersbyStatus(urlFormatRest(`status/getAllNumberOrdersbyStatus/${status_id}`, queryParameters)),

    getAllnumberOrders : async ({ number_order, status_id } : any) => await Requests.getAllnumberOrders(`status/getAllnumberOrders/${number_order}/${status_id}`),
    findStatusEmployee : async () => await Requests.findStatusEmployee('status/findStatusEmplyee') 
}