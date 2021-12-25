import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
  
}

export const SignsRequest =
{
    getAll : async () => await Requests.getAll(`signs`),
  
}