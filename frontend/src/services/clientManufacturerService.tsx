import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    createdOrDelete : async (url : string, body : any) => await instance.post(url, body).then(responseBody),
    findUsersByClientManufacture : async (url : string) => await instance.get(url).then(responseBody),
}

export const clientManufacturerRequest =
{
    getAll : async ({ manufacture_id }: any) => await Requests.getAll(`ClientManufacturer/findByManufactureId/${manufacture_id}`),
    createdOrDelete : async (body : any) => await Requests.createdOrDelete(`ClientManufacturer`, body),
    findUsersByClientManufacture : async ()=> await Requests.findUsersByClientManufacture(`ClientManufacturer/findUsersByClientManufacture`)
}