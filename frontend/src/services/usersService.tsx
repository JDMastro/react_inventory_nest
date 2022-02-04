import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    register : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody),
    login : async (url : string, body : any) => await instance.post(url,body).then(responseBody),

}

export const UsersRequest =
{
    me : async (queryParameters : any) => await Requests.getAll(urlFormatRest(`users/me`,queryParameters)),
    getAll : async (queryParameters : any) => await Requests.getAll(urlFormatRest(`users`,queryParameters)),
    register : async (body : any) => await Requests.register('users/register',body),
    delete : async (id: number, person_id : number) => await Requests.delete(`users/${id}/${person_id}`),
    update : async (id : number, body : any) => await Requests.update(`users/${id}`,body),
    login : async (body : any) => await Requests.login('users/login',body),
}
