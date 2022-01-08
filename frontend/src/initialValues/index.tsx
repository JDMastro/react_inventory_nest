import { initialFValuesTypes } from "../types/initialFValues";

export const initialValuesSignIn: initialFValuesTypes = {
  email_signin: "test@email.com",
  password_signin: "Test123"
}

export const initialValuesUsers: initialFValuesTypes = {
  code: "",
  email: "",
  password: "",
  confirmpassword: "",
  kind_id: "",
  idnumber: "",
  name: "",
  second_name: "",
  first_surname: "",
  second_surname: "",
  fullname: "",
  address: "",
  phone: "",
  contact: "",
  provider: false,
  user_id: "",
}

export const initialValuesUnits: initialFValuesTypes = {
  code: "",
  description: ""
}

export const initialValuesProductDad: initialFValuesTypes = {
  code_bar: "",
  description: "",
  isderivate: false,
  name: "",
  product_parent_id: null,
  purchase_unit_id: "",
  sale_unit_id: "",
  sku: "",
  user_id: 0,
  to_discount: null
}

export const initialValuesStatus: initialFValuesTypes = {
  name: "",
  description: "",
  code: "",
  is_to_employee : false
}

export const initialValuesKindId: initialFValuesTypes = {
  code: "",
  description: ""
}


export const initialValuesPerson: initialFValuesTypes = {
  address: "", 
  contact: "", 
  fullname: "",
  idnumber: "", 
  kind_id: "", 
  phone: "", 
  name: "", 
  first_surname: "",
  second_name: "", 
  second_surname: "",
  roles_id : ""
}

export const initialValueskindmovements: initialFValuesTypes = {
  name: "",
  description: "",
  classificationkindmovement_id : "",
  roles_id : "",
  status_id : "",
  require_consecutive : false,
  consecutive_id : ""
}

export const initialValuesMovements: initialFValuesTypes = {
  kindmovements: "",
  idperson: "",
  number_order: "",
  idproduct: "",
  quantity: "",
  totalPrice: "",
  unitprice: "",
  orderReturned: "",
  observation : ""
}

export const initialValuesConsecutive: initialFValuesTypes = {
  name : "",
  description : "",
  prefix : ""
}


export const initialValuesconversion: initialFValuesTypes = {
  conversion_from: "",
  conversion_to: "",
  conversion_quatity: "",
  signs_id: ""
}

export const initialValuesOutputsFilter: initialFValuesTypes = {
  status_id: "",
  person_id: ""
}

export const initialValuesProductionRejected: initialFValuesTypes = {
  observation: "",
}

export const initialValuesStatusChange: initialFValuesTypes = {
  status_id: "",
}
