import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body : any) => await instance.post(url, body).then(responseBody),
    updated :  async (url : string, body : any) => await instance.put(url, body).then(responseBody),
    deleted : async (url : string) => await instance.delete(url).then(responseBody),
    findStatusbysetting : async (url : string) => await instance.get(url).then(responseBody)
}

export const SettingsStatusRequest =
{
    getAll : async (queryParameters : any) => await Requests.getAll(urlFormatRest("settingstatus", queryParameters)),
    create : async (body : any) => await Requests.create("settingstatus",body),
    updated : async (settingStatus_id : number, body : any) => await Requests.updated(`settingstatus/${settingStatus_id}`,body),
    delete : async (id : number) => await Requests.deleted(`settingstatus/${id}`),
    findStatusbysetting : async (status_parent_id : number)=> await Requests.findStatusbysetting(`settingstatus/findStatusbysetting/${status_parent_id}`)
    
}