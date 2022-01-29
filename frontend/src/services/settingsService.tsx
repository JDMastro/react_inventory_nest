import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    findByKey : async (url : string) => await instance.get(url).then(responseBody),
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    update : async (url : string, body : any) => await instance.put(url,body).then(responseBody)
}

export const SettingsRequest =
{
    findByKey : async () => await Requests.findByKey(`settings/MOVI_IN_PROD`),
    getAll : async (queryParameters : any) => await Requests.getAll(urlFormatRest("settings", queryParameters)),
    update : async (id : number, body : any) => await Requests.update(`settings/${id}`,body)
}