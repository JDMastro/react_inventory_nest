import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    createOrDelete : async (url : string, body : any) => await instance.post(url, body).then(responseBody)
}

export const PermissionRequest =
{
    getAll : async (queryParameters : any) => await Requests.getAll(urlFormatRest("permission", queryParameters)),
    createOrDelete : async(body : any) => await Requests.createOrDelete('permission/CreateOrDelete', body)
}

//await Requests.getAll(urlFormatRest("settings", queryParameters))