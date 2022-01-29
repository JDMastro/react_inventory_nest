import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    findAllWithPagination : async (url : string) => await instance.get(url).then(responseBody),
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    update : async (url : string, body: any) => await instance.put(url, body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
}

export const UnitsRequest =
{
    findAllWithPagination : async(queryParameters : any) => await Requests.findAllWithPagination(urlFormatRest('units/withpagination',queryParameters)),
    getAll : async () => await Requests.getAll(`units`),
    create : async (body: any) => await Requests.create('units',body),
    update : async (id : number, body : any) => await Requests.update(`units/${id}`,body),
    delete : async (id: number) => await Requests.delete(`units/${id}`),
}