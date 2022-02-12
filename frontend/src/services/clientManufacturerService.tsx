import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    createdOrDelete : async (url : string, body : any) => await instance.post(url, body).then(responseBody),
    findUsersByClientManufacture : async (url : string) => await instance.get(url).then(responseBody),
}

export const clientManufacturerRequest =
{
    getAll : async (queryParameters : any) => await Requests.getAll(urlFormatRest(`ClientManufacturer/findByManufactureId`,queryParameters)),
    createdOrDelete : async (body : any) => await Requests.createdOrDelete(`ClientManufacturer`, body),
    findUsersByClientManufacture : async ()=> await Requests.findUsersByClientManufacture(`ClientManufacturer/findUsersByClientManufacture`)
}