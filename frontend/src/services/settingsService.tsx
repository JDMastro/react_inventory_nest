import { instance, responseBody } from './axiosInstance'

const Requests = {
    findByKey : async (url : string) => await instance.get(url).then(responseBody),
}

export const SettingsRequest =
{
    findByKey : async () => await Requests.findByKey(`settings/MOVI_IN_PROD`),
   
}