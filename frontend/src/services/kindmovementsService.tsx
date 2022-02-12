import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody),
    findAllWithoutProduction : async (url : string) => await instance.get(url).then(responseBody),
    findWithOnlyProduction : async (url : string) => await instance.get(url).then(responseBody),
    findKindMovClientOrProvider : async (url : string) => await instance.get(url).then(responseBody),
    //getAllForReports : async (url : string) => await instance.get(url).then(responseBody),
}

export const KindMovementsRequest =
{
    getAll : async (queryParameters : any) => await Requests.getAll(urlFormatRest(`kindmovements`,queryParameters)),
    save : async (body : any) => await Requests.save('kindmovements',body),
    delete : async (id: number) => await Requests.delete(`kindmovements/${id}`),
    update : async (id : number, body : any) => await Requests.update(`kindmovements/${id}`,body),
    findAllWithoutProduction : async () => await Requests.findAllWithoutProduction(`kindmovements/findAllWithoutProduction`),
    findWithOnlyProduction : async () => await Requests.findAllWithoutProduction(`kindmovements/findWithOnlyProduction`),
    findKindMovClientOrProvider : async () => await Requests.findKindMovClientOrProvider(`kindmovements/findKindMovClientOrProvider`),
    //getAllForReports : async () => await Requests.getAllForReports(`kindmovements/getAllForReports`),

}