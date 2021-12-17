// @ts-nocheck
/* eslint-disable */
import { useState } from 'react';

/**
 * Demo
 * const [fields, handleFieldChange] = useFormFields({ email: '', password: '' });
 * */

const useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    (event) => {
      setValues({
        ...fields,
        [event.target.name]: event.target.value,
      });
    },
  ];
};

export default useFormFields;
