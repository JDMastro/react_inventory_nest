import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    createProvider : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    deleteNovement : async (url : string) => await instance.delete(url).then(responseBody),
    findMovementByNumberOrder : async (url : string) => await instance.get(url).then(responseBody),
    
    
    findByPersonId : async (url : string) => await instance.get(url).then(responseBody),
    findByPersonOutPuts : async (url: string) => await instance.get(url).then(responseBody),
    
    
    findByHeader : async (url : string) => await instance.get(url).then(responseBody),
    createClient : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    getall : async (url:string) => await instance.get(url).then(responseBody),
    findAllReports : async (url:string) => await instance.get(url).then(responseBody),
    
    
    
    createProduction: async(url : string, body:any) => await instance.post(url, body).then(responseBody),
    //createProduction : async (url : string, body : any) => await instance.put(url, body),
    
    
    
    findStartedMovements : async (url : string) => await instance.get(url).then(responseBody),
    productionrejected : async (url:string, body:any) => await instance.put(url, body).then(responseBody),
    changeStatusMovement : async (url:string, body:any) => await instance.put(url, body).then(responseBody),
    //reports : async (url:string) => await instance.get(url).then(responseBody),
}

export const MovementRequest =
{
    createProvider : async (body: any) => await Requests.createProvider('movements/provider',body),
    deleteNovement : async (id : number) => await Requests.deleteNovement(`movements/${id}`),
    findMovementByNumberOrder : async (number_order : string) => await Requests.findMovementByNumberOrder(`movements/${number_order}`),
    
    
    findByPersonId : async (person_id : number) => await Requests.findByPersonId(`movements/header/${person_id}`),
    findByPersonOutPuts : async (person_id : number) => await Requests.findByPersonOutPuts(`movements/header/findByPersonOutPuts/${person_id}`),
    
    findByHeader : async (header_id : number) => await Requests.findByHeader(`movements/header/product/${header_id}`),
    createClient : async (body: any) => await Requests.createClient('movements/client',body),
    
    getall : async (queryParameters : any) => await Requests.getall(urlFormatRest('movements',queryParameters)),
    findAllReports: async (queryParameters : any) => await Requests.findAllReports(urlFormatRest('movements/reports/movement',queryParameters)),

    //reserveProduction : async (body: any) => await Requests.reserveProduction('movements/productions/reserved',body),
    createProduction : async (body: any) => await Requests.createClient(`movements/productions`,body),

    findStartedMovements : async (product_parent_id: number) => await Requests.findStartedMovements(`movements/findStartedMovements/${product_parent_id}`),
    productionrejected : async (movement_id:number, body:any) => await Requests.productionrejected(`movements/productionrejected/${movement_id}`,body),
    changeStatusMovement : async (movement_id:number, body:any) => await Requests.changeStatusMovement(`movements/changeStatusMovement/${movement_id}`,body),

    //reports : async (queryParameters : any) => { console.log(queryParameters); return { data : [] } }  //await Requests.getall(urlFormatRest('movements',queryParameters)),
    
}