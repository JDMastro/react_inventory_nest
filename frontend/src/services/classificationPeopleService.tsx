import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    getClassificationUserOrEmpleado : async (url : string) => await instance.get(url).then(responseBody),
}

export const classificationPeopleRequest =
{
    getAll : async () => await Requests.getAll(`classificationPeople`),
    getClassificationUserOrEmpleado : async () => await Requests.getClassificationUserOrEmpleado(`classificationPeople/getClassificationUserOrEmpleado`),
}