import { instance, responseBody } from './axiosInstance'

const Requests = {
    getNotDerivate : async (url : string) => await instance.get(url).then(responseBody),
    create : async (url : string, body: any) => await instance.post(url, body).then(responseBody),
    update : async (url : string, body: any) => await instance.put(url, body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    getDerivate : async (url : string) => await instance.get(url).then(responseBody),
    findProductByDerivate : async (url : string) => await instance.get(url).then(responseBody),

}

export const ProductsRequest =
{
    getNotDerivate : async (isderivate : boolean) => await Requests.getNotDerivate(`products/${isderivate}`),
    create : async (body: any) => await Requests.create('products',body),
    update : async (id : number, body : any) => await Requests.update(`products/${id}`,body),
    delete : async (id: number) => await Requests.delete(`products/${id}`),
    getDerivate : async (parent_id : number) => await Requests.getDerivate(`products/derivate/${parent_id}`),
    findProductByDerivate : async (is_derivate : boolean) => await Requests.findProductByDerivate(`products/${is_derivate}`)
}