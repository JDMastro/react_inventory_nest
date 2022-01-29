import { instance, responseBody } from './axiosInstance'
import { urlFormatRest } from "../utils/Url";

const Requests = {
    findAllWithPagination : async (url : string) => await instance.get(url).then(responseBody),
    getNotDerivate : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    update : async (url : string, body: any) => await instance.put(url, body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    getDerivate : async (url : string) => await instance.get(url).then(responseBody),
    findProductByDerivate : async (url : string) => await instance.get(url).then(responseBody),
    getByStatusSuggest : async (url : string) => await instance.get(url).then(responseBody),
    findProductParentProducction : async (url:string)=> await instance.get(url).then(responseBody)
}

export const ProductsRequest =
{
    getNotDerivate : async ({ isDerivate }: any) => await Requests.getNotDerivate(`products/parents/${isDerivate}`),
    findAllWithPagination : async(queryParameters : any) => await Requests.findAllWithPagination(urlFormatRest('products/withpagination',queryParameters)),


    create : async (body: any) => await Requests.create('products',body),
    update : async (id : number, body : any) => await Requests.update(`products/${id}`,body),
    delete : async (id: number) => await Requests.delete(`products/${id}`),
    getDerivate : async ({ parentId }: any) => await Requests.getDerivate(`products/derivate/${parentId}`),
    findProductByDerivate : async (is_derivate : boolean) => await Requests.findProductByDerivate(`products/parents/${is_derivate}`),
    getByStatusSuggest : async (product_parent_id : number) => await Requests.getByStatusSuggest(`products/suggest/${product_parent_id}`),
    findProductParentProducction : async ()=> await Requests.findProductParentProducction('products/parent/producction')
}