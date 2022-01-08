import { instance, responseBody } from './axiosInstance'

const Requests = {
    createProvider : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    deleteNovement : async (url : string) => await instance.delete(url).then(responseBody),
    findMovementByNumberOrder : async (url : string) => await instance.get(url).then(responseBody),
    findByPersonId : async (url : string) => await instance.get(url).then(responseBody),
    findByHeader : async (url : string) => await instance.get(url).then(responseBody),
    createClient : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    getall : async (url:string) => await instance.get(url).then(responseBody),
    createProduction : async(url : string, body:any) => await instance.post(url, body).then(responseBody),
    findStartedMovements : async (url : string) => await instance.get(url).then(responseBody),
    productionrejected : async (url:string, body:any) => await instance.put(url, body).then(responseBody),
    changeStatusMovement : async (url:string, body:any) => await instance.put(url, body).then(responseBody),
}

export const MovementRequest =
{
    createProvider : async (body: any) => await Requests.createProvider('movements/provider',body),
    deleteNovement : async (id : number) => await Requests.deleteNovement(`movements/${id}`),
    findMovementByNumberOrder : async (number_order : string) => await Requests.findMovementByNumberOrder(`movements/${number_order}`),
    findByPersonId : async (person_id : number) => await Requests.findByPersonId(`movements/header/${person_id}`),
    findByHeader : async (header_id : number) => await Requests.findByHeader(`movements/header/product/${header_id}`),
    createClient : async (body: any) => await Requests.createClient('movements/client',body),
    getall : async () => await Requests.getall('movements'),
    createProduction : async (body: any) => await Requests.createClient('movements/productions',body),
    findStartedMovements : async (product_parent_id: number) => await Requests.findStartedMovements(`movements/findStartedMovements/${product_parent_id}`),
    productionrejected : async (movement_id:number, body:any) => await Requests.productionrejected(`movements/productionrejected/${movement_id}`,body),
    changeStatusMovement : async (movement_id:number, body:any) => await Requests.changeStatusMovement(`movements/changeStatusMovement/${movement_id}`,body)

}