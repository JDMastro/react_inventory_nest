import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody),
    findAllWithoutProduction : async (url : string) => await instance.get(url).then(responseBody),
    findWithOnlyProduction : async (url : string) => await instance.get(url).then(responseBody),
    findKindMovClientOrProvider : async (url : string) => await instance.get(url).then(responseBody),
}

export const KindMovementsRequest =
{
    getAll : async () => await Requests.getAll(`kindmovements`),
    save : async (body : any) => await Requests.save('kindmovements',body),
    delete : async (id: number) => await Requests.delete(`kindmovements/${id}`),
    update : async (id : number, body : any) => await Requests.update(`kindmovements/${id}`,body),
    findAllWithoutProduction : async () => await Requests.findAllWithoutProduction(`kindmovements/findAllWithoutProduction`),
    findWithOnlyProduction : async () => await Requests.findAllWithoutProduction(`kindmovements/findWithOnlyProduction`),
    findKindMovClientOrProvider : async () => await Requests.findKindMovClientOrProvider(`kindmovements/findKindMovClientOrProvider`),
}