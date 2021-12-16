import { instance, responseBody } from './axiosInstance'

const Requests = {
    getRoleProviderOrClient : async (url : string) => await instance.get(url).then(responseBody),
}

export const RolesRequest =
{
    getRoleProviderOrClient : async () => await Requests.getRoleProviderOrClient(`roles`),
   
}