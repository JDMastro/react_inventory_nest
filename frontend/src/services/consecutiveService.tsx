import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    update : async (url : string, body: any) => await instance.put(url, body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
}

export const ConsecutiveRequest =
{
    getAll : async () => await Requests.getAll(`consecutive`),
    create : async (body: any) => await Requests.create('consecutive',body),
    update : async (id : number, body : any) => await Requests.update(`consecutive/${id}`,body),
    delete : async (id: number) => await Requests.delete(`consecutive/${id}`),
}